import { ResumeData } from '@/types/resume';

export async function downloadPDF(resumeData: ResumeData, template: string = 'modern'): Promise<void> {
  try {
    console.log('Starting PDF generation for template:', template);
    
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData,
        template,
      }),
    });

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

    // Get the PDF blob
    const pdfBlob = await response.blob();
    
    if (!pdfBlob || pdfBlob.size === 0) {
      throw new Error('Generated PDF is empty');
    }

    console.log('PDF blob received, size:', pdfBlob.size);

    // Create download link for PDF
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    console.log('PDF downloaded successfully');

  } catch (error) {
    console.error('PDF generation error:', error);
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