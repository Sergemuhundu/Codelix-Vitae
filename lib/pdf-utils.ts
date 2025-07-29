import { ResumeData } from '@/types/resume';

export async function downloadPDF(resumeData: ResumeData, template: string = 'modern'): Promise<void> {
  try {
    console.log('Starting HTML download for template:', template);
    
    // Validate data before sending
    if (!resumeData || typeof resumeData !== 'object') {
      throw new Error('Invalid resume data');
    }
    
    if (!resumeData.personalInfo || typeof resumeData.personalInfo !== 'object') {
      throw new Error('Invalid personal info data');
    }
    
    if (!template || typeof template !== 'string') {
      throw new Error('Invalid template');
    }
    
    // Add retry logic
    let response;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        console.log(`Attempt ${retryCount + 1} of ${maxRetries}`);
        
        response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resumeData,
            template,
          }),
        });
        
        if (response.ok) {
          break; // Success, exit retry loop
        }
        
        console.log(`Attempt ${retryCount + 1} failed with status:`, response.status);
        retryCount++;
        
        if (retryCount < maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      } catch (fetchError) {
        console.error(`Fetch error on attempt ${retryCount + 1}:`, fetchError);
        retryCount++;
        
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        } else {
          throw new Error(`Failed to connect to server after ${maxRetries} attempts`);
        }
      }
    }
    
    if (!response || !response.ok) {
      const errorText = await response?.text() || 'No response from server';
      console.error('Server error response:', errorText);
      
      let errorMessage = 'Failed to generate PDF';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    // Get the HTML content
    const htmlContent = await response.text();
    
    if (!htmlContent || htmlContent.length === 0) {
      throw new Error('Generated HTML is empty');
    }
    
    console.log('HTML content received, length:', htmlContent.length);
    
    // Try to open in new window first
    try {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        // Write the HTML content to the new window
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        console.log('PDF download completed successfully - opened in new window');
        return;
      }
    } catch (windowError) {
      console.log('Failed to open new window, trying download method:', windowError);
    }
    
    // Fallback: Create downloadable HTML file
    console.log('Using download method - creating downloadable HTML file');
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('PDF download completed successfully - downloaded HTML file');
    
    // Show success message with instructions
    alert('Resume downloaded successfully! To view and print:\n\n1. Go to your Downloads folder\n2. Find the HTML file (resume-[name].html)\n3. Right-click and "Open with" your web browser\n4. Use Ctrl+P (or Cmd+P) to print as PDF');
    
  } catch (error) {
    console.error('PDF download error:', error);
    throw error;
  }
}

export function validateResumeData(data: ResumeData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required personal info
  if (!data.personalInfo.name?.trim()) {
    errors.push('Name is required');
  }
  if (!data.personalInfo.title?.trim()) {
    errors.push('Professional title is required');
  }
  if (!data.personalInfo.email?.trim()) {
    errors.push('Email is required');
  }
  if (!data.personalInfo.phone?.trim()) {
    errors.push('Phone number is required');
  }
  
  // Check if at least one section has content
  const hasContent = 
    (data.summary && data.summary.trim()) ||
    (data.experience && data.experience.length > 0) ||
    (data.education && data.education.length > 0) ||
    (data.skills && data.skills.length > 0);
    
  if (!hasContent) {
    errors.push('At least one section (summary, experience, education, or skills) must have content');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getResumePreviewData(): ResumeData {
  return {
    personalInfo: {
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
    },
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.',
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2022',
        endDate: 'Present',
        description: 'Lead development of microservices architecture, improved system performance by 40%, and mentored junior developers.',
      },
      {
        company: 'Startup Inc',
        position: 'Full Stack Developer',
        startDate: '2020',
        endDate: '2022',
        description: 'Built and maintained web applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver features.',
      },
    ],
    education: [
      {
        school: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationYear: '2020',
        gpa: '3.8',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Git'],
  };
} 