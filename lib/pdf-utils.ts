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
      if (!exp.description || exp.description.length === 0 || exp.description.every(bullet => bullet.trim() === '')) {
        errors.push(`At least one description bullet point is required for experience ${index + 1}`);
      }
    });
  }
  
  // Validate education (optional - only validate if education entries exist)
  if (data.education && data.education.length > 0) {
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
  
  // Skills are optional - no validation required
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getResumePreviewData(): ResumeData {
  return {
    personalInfo: {
      name: 'Your Name',
      title: 'Professional Title',
      email: 'your.email@example.com',
      phone: '+1 (555) 123-4567',
      location: 'City, State',
      website: '',
      linkedin: '',
      github: '',
      photo: '',
      photoAdjustments: {
        scale: 1,
        translateX: 0,
        translateY: 0,
        rotation: 0,
      },
    },
    summary: 'Experienced professional with a proven track record of success in [your field]. Skilled in [key skills] with expertise in [specific areas]. Demonstrated ability to [key achievements or capabilities]. Seeking opportunities to [career goals or objectives].',
    experience: [
      {
        company: 'Company Name',
        position: 'Job Title',
        startDate: '2020-01',
        endDate: 'Present',
        description: [
          'Led and managed [specific responsibilities]',
          'Achieved [quantifiable results]',
          'Collaborated with [teams/departments] to [outcomes]',
          'Implemented [processes/systems] resulting in [improvements]'
        ],
      }
    ],
    education: [
      {
        school: 'University Name',
        degree: "Bachelor's Degree",
        field: 'Field of Study',
        graduationYear: '2020',
        gpa: '',
      }
    ],
    skills: ['Communication Skills', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management'],
    projects: [],
    certifications: [],
    languages: ['English (Native)', 'Spanish (Conversational)'],
    interests: [],
  };
} 