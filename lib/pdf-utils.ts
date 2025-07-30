import { ResumeData } from '@/types/resume';

export async function downloadPDF(resumeData: ResumeData, template: string = 'modern'): Promise<void> {
  try {
    console.log('Starting HTML generation for template:', template);
    
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
      
      let errorMessage = 'Failed to generate resume';
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
    
    // Create a blob URL for the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    console.log('Blob URL created:', url);
    
    // Try multiple methods to open the window
    let windowOpened = false;
    
    // Method 1: Try opening with specific window features
    console.log('Attempting to open new window (method 1)...');
    let newWindow = window.open(url, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no');
    
    if (newWindow && !newWindow.closed) {
      console.log('Window opened successfully (method 1)');
      windowOpened = true;
    } else {
      console.log('Method 1 failed, trying method 2...');
      
      // Method 2: Try opening without features
      newWindow = window.open(url, '_blank');
      
      if (newWindow && !newWindow.closed) {
        console.log('Window opened successfully (method 2)');
        windowOpened = true;
      } else {
        console.log('Method 2 failed, trying method 3...');
        
        // Method 3: Try opening in same window
        try {
          window.location.href = url;
          console.log('Redirected to resume in same window');
          windowOpened = true;
        } catch (redirectError) {
          console.log('Method 3 failed:', redirectError);
        }
      }
    }
    
    if (windowOpened) {
      console.log('Resume opened successfully');
      
      // Clean up the blob URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
      
      return;
    }
    
    // Fallback: download the HTML file
    console.log('All window opening methods failed, falling back to HTML file download');
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('HTML file downloaded successfully');
    
    // Show instructions
    alert('Resume downloaded successfully! To convert to PDF:\n\n1. Go to your Downloads folder\n2. Find the HTML file (resume-[name].html)\n3. Right-click and "Open with" your web browser\n4. Use Ctrl+P (or Cmd+P) to print as PDF');
    
  } catch (error) {
    console.error('Resume generation error:', error);
    throw error;
  }
}

export function validateResumeData(data: ResumeData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate personal info
  if (!data.personalInfo) {
    errors.push('Personal information is required');
  } else {
    if (!data.personalInfo.name || data.personalInfo.name.trim() === '') {
      errors.push('Name is required');
    }
    if (!data.personalInfo.email || data.personalInfo.email.trim() === '') {
      errors.push('Email is required');
    }
    if (!data.personalInfo.phone || data.personalInfo.phone.trim() === '') {
      errors.push('Phone number is required');
    }
    if (!data.personalInfo.title || data.personalInfo.title.trim() === '') {
      errors.push('Professional title is required');
    }
  }
  
  // Validate summary
  if (!data.summary || data.summary.trim() === '') {
    errors.push('Professional summary is required');
  }
  
  // Validate experience
  if (!data.experience || data.experience.length === 0) {
    errors.push('At least one work experience is required');
  } else {
    data.experience.forEach((exp, index) => {
      if (!exp.company || exp.company.trim() === '') {
        errors.push(`Company name is required for experience ${index + 1}`);
      }
      if (!exp.position || exp.position.trim() === '') {
        errors.push(`Position is required for experience ${index + 1}`);
      }
      if (!exp.startDate || exp.startDate.trim() === '') {
        errors.push(`Start date is required for experience ${index + 1}`);
      }
      if (!exp.description || exp.description.trim() === '') {
        errors.push(`Description is required for experience ${index + 1}`);
      }
    });
  }
  
  // Validate education
  if (!data.education || data.education.length === 0) {
    errors.push('At least one education entry is required');
  } else {
    data.education.forEach((edu, index) => {
      if (!edu.school || edu.school.trim() === '') {
        errors.push(`School name is required for education ${index + 1}`);
      }
      if (!edu.degree || edu.degree.trim() === '') {
        errors.push(`Degree is required for education ${index + 1}`);
      }
      if (!edu.graduationYear || edu.graduationYear.trim() === '') {
        errors.push(`Graduation year is required for education ${index + 1}`);
      }
    });
  }
  
  // Validate skills
  if (!data.skills || data.skills.length === 0) {
    errors.push('At least one skill is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
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
    languages: ['English (Native)', 'Spanish (Fluent)', 'French (Intermediate)'],
  };
} 