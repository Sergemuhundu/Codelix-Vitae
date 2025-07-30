'use client';

import { useEffect, useState } from 'react';
import { ResumeData } from '@/types/resume';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Use a simple HTML generation approach instead of dynamic imports
        const html = generateSimpleHTML(data, template);
        
        if (!html || html.trim().length === 0) {
          throw new Error('Generated HTML is empty');
        }
        
        setPreviewHtml(html);
      } catch (error) {
        console.error('Error generating preview:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    generatePreview();
  }, [data, template]);

  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === template);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Generating preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-sm text-red-500 mb-2">Preview Error</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Template Info */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{currentTemplateData?.name}</span>
        <span className="text-muted-foreground">Live Preview</span>
      </div>

      {/* Preview Container */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <div 
          className="w-full"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </div>

      {/* Preview Info */}
      <div className="text-xs text-muted-foreground text-center">
        This is a preview of how your resume will look. The final PDF may have slight formatting differences.
      </div>
    </div>
  );
}

// Simple HTML generator function
function generateSimpleHTML(data: ResumeData, template: string): string {
  const { personalInfo, summary, experience, education, skills } = data;

  // Check if this is the blue-simple template
  if (template === 'blue-simple') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body { 
            font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            margin: 0; 
            padding: 0; 
            background: #ffffff; 
            color: #1f2937;
            line-height: 1.6;
            font-size: 14px;
          }
          
          .page {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            min-height: 297mm;
            display: flex;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          
          .sidebar {
            width: 35%;
            background: #163853;
            color: white;
            padding: 30px 25px;
            position: relative;
          }
          
          .main-content {
            width: 65%;
            padding: 30px 35px;
            background: white;
          }
          
          .profile-picture {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5em;
            font-weight: bold;
            color: #6b7280;
            margin: 0 auto 30px;
            overflow: hidden;
            border: 3px solid white;
          }
          
          .profile-picture img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
          
          .sidebar-section {
            margin-bottom: 30px;
          }
          
          .sidebar-title {
            font-size: 16px;
            font-weight: 800;
            text-transform: uppercase;
            margin-bottom: 15px;
            border-bottom: 1px solid #ffffff;
            padding-bottom: 8px;
            letter-spacing: 1px;
            font-family: 'Inter', sans-serif;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.95);
            font-weight: 400;
          }
          
          .contact-item:last-child {
            margin-bottom: 0;
          }
          
          .education-item {
            margin-bottom: 15px;
          }
          
          .education-year {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 3px;
            font-weight: 500;
          }
          
          .education-school {
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 3px;
            color: white;
          }
          
          .education-degree {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 400;
          }
          
          .skills-list, .languages-list {
            list-style: none;
          }
          
          .skills-list li, .languages-list li {
            margin-bottom: 8px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.95);
            position: relative;
            padding-left: 15px;
            font-weight: 400;
          }
          
          .skills-list li::before, .languages-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: white;
            font-weight: bold;
          }
          
          .main-header {
            margin-bottom: 30px;
          }
          
          .name {
            font-size: 32px;
            font-weight: 800;
            color: #374151;
            margin-bottom: 5px;
            line-height: 1.2;
            font-family: 'Inter', sans-serif;
            letter-spacing: -0.5px;
          }
          
          .title {
            font-size: 16px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            margin-bottom: 10px;
            border-bottom: 3px solid #163853;
            padding-bottom: 5px;
            display: inline-block;
            font-family: 'Inter', sans-serif;
            letter-spacing: 0.5px;
            width: 60px;
            white-space: nowrap;
          }
          
          .main-section {
            margin-bottom: 25px;
          }
          
          .main-section-title {
            font-size: 18px;
            font-weight: 800;
            color: #374151;
            text-transform: uppercase;
            margin-bottom: 15px;
            border-bottom: 1px solid #163853;
            padding-bottom: 8px;
            letter-spacing: 1px;
            font-family: 'Inter', sans-serif;
          }
          
          .profile-text {
            font-size: 14px;
            line-height: 1.7;
            color: #4b5563;
            text-align: justify;
            font-weight: 400;
          }
          
          .experience-item {
            margin-bottom: 20px;
            position: relative;
            padding-left: 20px;
          }
          
          .experience-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #163853;
          }
          
          .experience-item::after {
            content: '';
            position: absolute;
            left: -3px;
            top: 8px;
            width: 8px;
            height: 8px;
            background: #163853;
            border-radius: 50%;
            border: 2px solid white;
          }
          
          .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
          }
          
          .company {
            font-size: 15px;
            font-weight: 700;
            color: #374151;
            font-family: 'Inter', sans-serif;
          }
          
          .position {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 8px;
            font-family: 'Inter', sans-serif;
          }
          
          .date {
            font-size: 12px;
            color: #9ca3af;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
          }
          
          .description {
            font-size: 13px;
            line-height: 1.6;
            color: #4b5563;
            font-weight: 400;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="sidebar">
            ${personalInfo.photo ? `
              <div class="profile-picture">
                <img src="${personalInfo.photo}" alt="Profile Photo" />
              </div>
            ` : `
              <div class="profile-picture">
                ${personalInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
            `}
            
            <div class="sidebar-section">
              <div class="sidebar-title">Contact</div>
              <div class="contact-item">📱 ${personalInfo.phone}</div>
              <div class="contact-item">📧 ${personalInfo.email}</div>
              ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
              ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
            </div>

            ${education && education.length > 0 ? `
              <div class="sidebar-section">
                <div class="sidebar-title">Education</div>
                ${education.map(edu => `
                  <div class="education-item">
                    <div class="education-year">${edu.graduationYear}</div>
                    <div class="education-school">${edu.school}</div>
                    <div class="education-degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
                    ${edu.gpa ? `<div class="education-degree">GPA: ${edu.gpa}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${skills && skills.length > 0 ? `
              <div class="sidebar-section">
                <div class="sidebar-title">Skills</div>
                <ul class="skills-list">
                  ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${data.languages && data.languages.length > 0 ? `
              <div class="sidebar-section">
                <div class="sidebar-title">Languages</div>
                <ul class="languages-list">
                  ${data.languages.map(language => `<li>${language}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>

          <div class="main-content">
            <div class="main-header">
              <div class="name">${personalInfo.name}</div>
              <div class="title">${personalInfo.title}</div>
            </div>

            ${summary ? `
              <div class="main-section">
                <div class="main-section-title">Profile</div>
                <div class="profile-text">${summary}</div>
              </div>
            ` : ''}

            ${experience && experience.length > 0 ? `
              <div class="main-section">
                <div class="main-section-title">Work Experience</div>
                ${experience.map(exp => `
                  <div class="experience-item">
                    <div class="experience-header">
                      <div class="company">${exp.company}</div>
                      <div class="date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                    </div>
                    <div class="position">${exp.position}</div>
                    <div class="description">${exp.description}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // For other templates, use the existing logic
  const getTemplateStyles = () => {
    // Map template IDs to style categories
    const getStyleCategory = (templateId: string) => {
      // Free templates (simple)
      if (templateId.includes('simple')) {
        if (templateId.includes('blue')) return 'blue-simple';
        if (templateId.includes('neutral')) return 'minimal';
        if (templateId.includes('white')) return 'minimal';
        if (templateId.includes('gray')) return 'modern';
        if (templateId.includes('systems-design')) return 'professional';
        return 'modern';
      }
      
      // Premium templates
      if (templateId.includes('minimalist')) return 'minimal';
      if (templateId.includes('professional')) return 'professional';
      if (templateId.includes('corporate')) return 'professional';
      if (templateId.includes('modern')) return 'modern';
      if (templateId.includes('clean')) return 'minimal';
      if (templateId.includes('signature')) return 'minimal';
      if (templateId.includes('sales')) return 'professional';
      if (templateId.includes('marketing')) return 'professional';
      if (templateId.includes('graphic-designer')) return 'creative';
      if (templateId.includes('education')) return 'professional';
      if (templateId.includes('accountant')) return 'professional';
      if (templateId.includes('pink')) return 'creative';
      if (templateId.includes('green')) return 'professional';
      if (templateId.includes('brown') || templateId.includes('beige') || templateId.includes('ivory')) return 'minimal';
      
      // Default fallbacks
      return 'modern';
    };

    const styleCategory = getStyleCategory(template);
    
    switch (styleCategory) {
      case 'minimal':
        return `
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              margin: 0; 
              padding: 30px; 
              background: white; 
              line-height: 1.6;
            }
            .header { 
              margin-bottom: 40px; 
            }
            .name { 
              font-size: 2.8em; 
              font-weight: 300; 
              color: #111827; 
              margin-bottom: 8px; 
            }
            .title { 
              font-size: 1.1em; 
              color: #6b7280; 
              margin-bottom: 20px; 
            }
            .contact { 
              display: flex; 
              gap: 25px; 
              flex-wrap: wrap; 
            }
            .contact-item { 
              color: #6b7280; 
              font-size: 0.95em; 
            }
            .section { 
              margin-bottom: 35px; 
            }
            .section-title { 
              font-size: 1.4em; 
              font-weight: 300; 
              color: #111827; 
              margin-bottom: 20px; 
              text-transform: uppercase; 
              letter-spacing: 1px; 
            }
            .summary { 
              line-height: 1.7; 
              color: #374151; 
              font-size: 1.05em; 
            }
            .experience-item, .education-item { 
              margin-bottom: 25px; 
            }
            .experience-header, .education-header { 
              margin-bottom: 8px; 
            }
            .company, .school { 
              font-weight: 500; 
              color: #111827; 
              font-size: 1.1em; 
            }
            .position, .degree { 
              color: #6b7280; 
              font-size: 1em; 
              margin-bottom: 5px; 
            }
            .date { 
              color: #9ca3af; 
              font-size: 0.9em; 
            }
            .description { 
              line-height: 1.6; 
              color: #374151; 
              margin-top: 8px; 
            }
            .skills { 
              display: flex; 
              flex-wrap: wrap; 
              gap: 10px; 
            }
            .skill { 
              color: #374151; 
              font-size: 0.95em; 
            }
            .skill:not(:last-child)::after { 
              content: "•"; 
              margin-left: 10px; 
              color: #9ca3af; 
            }
          </style>
        `;
      
      case 'professional':
        return `
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              margin: 0; 
              padding: 25px; 
              background: white; 
              line-height: 1.6;
            }
            .header { 
              border-bottom: 3px solid #1e40af; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .name { 
              font-size: 2.4em; 
              font-weight: bold; 
              color: #1e40af; 
              margin-bottom: 8px; 
            }
            .title { 
              font-size: 1.3em; 
              color: #374151; 
              margin-bottom: 15px; 
            }
            .contact { 
              display: flex; 
              gap: 20px; 
              flex-wrap: wrap; 
            }
            .contact-item { 
              color: #6b7280; 
            }
            .section { 
              margin-bottom: 25px; 
            }
            .section-title { 
              font-size: 1.3em; 
              font-weight: bold; 
              color: #1e40af; 
              border-bottom: 2px solid #1e40af; 
              padding-bottom: 5px; 
              margin-bottom: 15px; 
            }
            .summary { 
              line-height: 1.6; 
              color: #374151; 
            }
            .experience-item, .education-item { 
              margin-bottom: 20px; 
            }
            .experience-header, .education-header { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              margin-bottom: 5px; 
            }
            .company, .school { 
              font-weight: bold; 
              color: #1e40af; 
            }
            .position, .degree { 
              font-weight: 500; 
              color: #374151; 
              margin-bottom: 5px; 
            }
            .date { 
              color: #6b7280; 
              font-size: 0.9em; 
            }
            .description { 
              line-height: 1.5; 
              color: #374151; 
            }
            .skills { 
              display: flex; 
              flex-wrap: wrap; 
              gap: 8px; 
            }
            .skill { 
              background: #f3f4f6; 
              padding: 4px 12px; 
              border-radius: 15px; 
              font-size: 0.9em; 
              color: #374151; 
            }
          </style>
        `;
      
      default: // modern
        return `
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: white; 
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
            }
            .name { 
              font-size: 2.5em; 
              font-weight: bold; 
              color: #1f2937; 
              margin-bottom: 5px; 
            }
            .title { 
              font-size: 1.2em; 
              color: #6b7280; 
              margin-bottom: 15px; 
            }
            .contact { 
              display: flex; 
              justify-content: center; 
              gap: 20px; 
              flex-wrap: wrap; 
            }
            .contact-item { 
              color: #6b7280; 
            }
            .section { 
              margin-bottom: 25px; 
            }
            .section-title { 
              font-size: 1.3em; 
              font-weight: bold; 
              color: #1f2937; 
              border-bottom: 2px solid #3b82f6; 
              padding-bottom: 5px; 
              margin-bottom: 15px; 
            }
            .summary { 
              line-height: 1.6; 
              color: #374151; 
            }
            .experience-item, .education-item { 
              margin-bottom: 20px; 
            }
            .experience-header, .education-header { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              margin-bottom: 5px; 
            }
            .company, .school { 
              font-weight: bold; 
              color: #1f2937; 
            }
            .position, .degree { 
              font-weight: 500; 
              color: #374151; 
              margin-bottom: 5px; 
            }
            .date { 
              color: #6b7280; 
              font-size: 0.9em; 
            }
            .description { 
              line-height: 1.5; 
              color: #374151; 
            }
            .skills { 
              display: flex; 
              flex-wrap: wrap; 
              gap: 8px; 
            }
            .skill { 
              background: #f3f4f6; 
              padding: 4px 12px; 
              border-radius: 15px; 
              font-size: 0.9em; 
              color: #374151; 
            }
          </style>
        `;
    }
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      ${getTemplateStyles()}
    </head>
    <body>
      <div class="header">
        <div class="name">${personalInfo.name}</div>
        <div class="title">${personalInfo.title}</div>
        <div class="contact">
          <div class="contact-item">📧 ${personalInfo.email}</div>
          <div class="contact-item">📱 ${personalInfo.phone}</div>
          ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
          ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
        </div>
      </div>

      ${summary ? `
        <div class="section">
          <div class="section-title">Professional Summary</div>
          <div class="summary">${summary}</div>
        </div>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${experience.map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <div class="company">${exp.company}</div>
                <div class="date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
              </div>
              <div class="position">${exp.position}</div>
              <div class="description">${exp.description}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${education && education.length > 0 ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${education.map(edu => `
            <div class="education-item">
              <div class="education-header">
                <div class="school">${edu.school}</div>
                <div class="date">${edu.graduationYear}</div>
              </div>
              <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
              ${edu.gpa ? `<div class="description">GPA: ${edu.gpa}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${skills && skills.length > 0 ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills">
            ${skills.map(skill => `
              <span class="skill">${skill}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </body>
    </html>
  `;
}