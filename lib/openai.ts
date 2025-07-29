export interface ATSAnalysisResult {
  overallScore: number;
  sections: {
    keywords: { score: number; suggestions: number };
    format: { score: number; suggestions: number };
    content: { score: number; suggestions: number };
    skills: { score: number; suggestions: number };
  };
  suggestions: Array<{
    type: string;
    priority: 'high' | 'medium' | 'low';
    issue: string;
    solution: string;
  }>;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export interface CoverLetterRequest {
  jobTitle: string;
  companyName: string;
  jobDescription?: string;
  userExperience?: string;
  userSkills?: string;
  tone: 'professional' | 'enthusiastic' | 'conversational';
}

export interface AISuggestion {
  type: 'job_title' | 'skill' | 'summary' | 'experience' | 'keyword';
  content: string;
  confidence: number;
  reasoning?: string;
}

export interface JobTitleSuggestion {
  title: string;
  description: string;
  salary_range?: string;
  requirements?: string[];
}

class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
  }

  async analyzeResumeForATS(
    resumeText: string, 
    jobDescription?: string
  ): Promise<ATSAnalysisResult> {
    try {
      const prompt = `
        Analyze the following resume for ATS (Applicant Tracking System) compatibility and provide a detailed assessment:

        Resume Text:
        ${resumeText}

        ${jobDescription ? `Job Description:\n${jobDescription}` : ''}

        Please provide:
        1. Overall ATS compatibility score (0-100)
        2. Section-specific scores for keywords, format, content, and skills
        3. Specific suggestions for improvement
        4. Keywords that match (if job description provided)
        5. Missing keywords that should be added

        Format the response as a JSON object matching the ATSAnalysisResult interface.
      `;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert ATS and resume optimization specialist. Provide detailed, actionable feedback for resume improvement.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      
      return result;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze resume. Please try again.');
    }
  }

  async generateCoverLetter(request: CoverLetterRequest): Promise<string> {
    try {
      const prompt = `
        Generate a professional cover letter based on the following information:

        Job Title: ${request.jobTitle}
        Company Name: ${request.companyName}
        ${request.jobDescription ? `Job Description: ${request.jobDescription}` : ''}
        ${request.userExperience ? `User Experience: ${request.userExperience}` : ''}
        ${request.userSkills ? `User Skills: ${request.userSkills}` : ''}
        Tone: ${request.tone}

        Requirements:
        - Professional and compelling
        - Tailored to the specific job and company
        - Highlights relevant experience and skills
        - Uses the requested tone
        - Include proper cover letter structure
        - 3-4 paragraphs maximum
        - Leave placeholder [Your Name] for signature
      `;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert career counselor and professional writer specializing in cover letters.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating cover letter:', error);
      throw new Error('Failed to generate cover letter. Please try again.');
    }
  }

  async optimizeResumeForJob(
    resumeContent: any,
    jobDescription: string
  ): Promise<any> {
    try {
      const prompt = `
        Optimize the following resume content for this specific job posting:

        Current Resume:
        ${JSON.stringify(resumeContent, null, 2)}

        Job Description:
        ${jobDescription}

        Please return an optimized version of the resume that:
        1. Incorporates relevant keywords from the job description
        2. Emphasizes relevant experience and skills
        3. Adjusts the professional summary to match the role
        4. Reorders sections to highlight the most relevant information
        5. Maintains all original information while optimizing presentation

        Return the result as a JSON object with the same structure as the input resume.
      `;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert resume writer and ATS optimization specialist.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize resume');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error optimizing resume:', error);
      throw new Error('Failed to optimize resume. Please try again.');
    }
  }

  async getJobTitleSuggestions(
    currentTitle: string,
    experience: string,
    skills: string[]
  ): Promise<JobTitleSuggestion[]> {
    try {
      const prompt = `
        Based on the following information, suggest 5 relevant job titles that would be appropriate:

        Current Title: ${currentTitle}
        Experience: ${experience}
        Skills: ${skills.join(', ')}

        For each suggestion, provide:
        1. The job title
        2. A brief description of the role
        3. Typical salary range (if known)
        4. Key requirements

        Return as a JSON array of JobTitleSuggestion objects.
      `;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert career counselor and job market analyst.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get job title suggestions');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error getting job title suggestions:', error);
      throw new Error('Failed to get job title suggestions. Please try again.');
    }
  }

  async getSkillSuggestions(
    jobTitle: string,
    currentSkills: string[],
    experience: string
  ): Promise<AISuggestion[]> {
    try {
      const prompt = `
        Based on the job title and experience, suggest relevant skills that would enhance the resume:

        Job Title: ${jobTitle}
        Current Skills: ${currentSkills.join(', ')}
        Experience: ${experience}

        Suggest skills that are:
        1. Relevant to the job title
        2. Commonly required in the industry
        3. Not already in the current skills list
        4. Both technical and soft skills

        Return as a JSON array of AISuggestion objects with type 'skill'.
      `;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert in career development and skill assessment.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get skill suggestions');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error getting skill suggestions:', error);
      throw new Error('Failed to get skill suggestions. Please try again.');
    }
  }

  async getSummarySuggestions(
    jobTitle: string,
    experience: string,
    skills: string[],
    currentSummary?: string
  ): Promise<AISuggestion[]> {
    try {
      const prompt = `
        Generate 3 different professional summary suggestions for this resume:

        Job Title: ${jobTitle}
        Experience: ${experience}
        Skills: ${skills.join(', ')}
        ${currentSummary ? `Current Summary: ${currentSummary}` : ''}

        Create summaries that are:
        1. Professional and compelling
        2. Tailored to the job title
        3. Highlight key achievements and skills
        4. Different in tone and focus (achievement-focused, skill-focused, experience-focused)

        Return as a JSON array of AISuggestion objects with type 'summary'.
      `;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert resume writer specializing in professional summaries.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.4,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get summary suggestions');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error getting summary suggestions:', error);
      throw new Error('Failed to get summary suggestions. Please try again.');
    }
  }

  async getKeywordSuggestions(
    jobTitle: string,
    jobDescription?: string
  ): Promise<AISuggestion[]> {
    try {
      const prompt = `
        Extract and suggest relevant keywords for this job title:

        Job Title: ${jobTitle}
        ${jobDescription ? `Job Description: ${jobDescription}` : ''}

        Suggest keywords that are:
        1. Commonly used in job postings for this role
        2. ATS-friendly terms
        3. Industry-specific terminology
        4. Both technical and soft skill keywords

        Return as a JSON array of AISuggestion objects with type 'keyword'.
      `;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert in ATS optimization and keyword analysis.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 600,
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get keyword suggestions');
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error getting keyword suggestions:', error);
      throw new Error('Failed to get keyword suggestions. Please try again.');
    }
  }
}

export const openAIService = new OpenAIService();