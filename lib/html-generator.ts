import { ResumeData } from '@/types/resume';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';

export function generateHTML(data: ResumeData, template: string = 'modern'): string {
  const { personalInfo, summary, experience, education, skills } = data;

  // Helper function to show placeholder when data is empty
  const getPlaceholder = (value: string, placeholder: string) => {
    return value && value.trim() !== '' ? value : placeholder;
  };

  const getPlaceholderOrEmpty = (value: string, placeholder: string) => {
    return value && value.trim() !== '' ? value : `<span style="color: #9ca3af; font-style: italic;">${placeholder}</span>`;
  };

  const getInitials = (name: string) => {
    return name && name.trim() !== '' ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD';
  };

  const getFirstName = (name: string) => {
    return name && name.trim() !== '' ? name.split(' ')[0] : 'John';
  };

  // Get the actual template data
  const templateData = AVAILABLE_TEMPLATES.find(t => t.id === template);
  
  // Get template-specific styles
  const getTemplateStyles = () => {
    // Map template IDs to style categories
    const getStyleCategory = (templateId: string) => {
      // Free templates (simple)
      if (templateId.includes('simple')) {
        if (templateId.includes('blue')) return 'modern';
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
      case 'modern':
        return `
          <style>
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; background: white; }
            .header { text-align: center; margin-bottom: 30px; }
            .name { font-size: 2.5em; font-weight: bold; color: #1f2937; margin-bottom: 5px; }
            .title { font-size: 1.2em; color: #6b7280; margin-bottom: 15px; }
            .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
            .contact-item { color: #6b7280; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 1.3em; font-weight: bold; color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px; }
            .summary { line-height: 1.6; color: #374151; }
            .experience-item, .education-item { margin-bottom: 20px; }
            .experience-header, .education-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
            .company, .school { font-weight: bold; color: #1f2937; }
            .position, .degree { font-weight: 500; color: #374151; margin-bottom: 5px; }
            .date { color: #6b7280; font-size: 0.9em; }
            .description { line-height: 1.5; color: #374151; }
            .description ul { list-style: none; margin: 0; padding: 0; }
            .description li { display: block; margin-bottom: 4px; }
            .skills { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill { background: #f3f4f6; padding: 4px 12px; border-radius: 15px; font-size: 0.9em; color: #374151; }
          </style>
        `;
      
      case 'minimal':
        return `
          <style>
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 30px; background: white; }
            .header { margin-bottom: 40px; }
            .name { font-size: 2.8em; font-weight: 300; color: #111827; margin-bottom: 8px; }
            .title { font-size: 1.1em; color: #6b7280; margin-bottom: 20px; }
            .contact { display: flex; gap: 25px; flex-wrap: wrap; }
            .contact-item { color: #6b7280; font-size: 0.95em; }
            .section { margin-bottom: 35px; }
            .section-title { font-size: 1.4em; font-weight: 300; color: #111827; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
            .summary { line-height: 1.7; color: #374151; font-size: 1.05em; }
            .experience-item, .education-item { margin-bottom: 25px; }
            .experience-header, .education-header { margin-bottom: 8px; }
            .company, .school { font-weight: 500; color: #111827; font-size: 1.1em; }
            .position, .degree { color: #6b7280; font-size: 1em; margin-bottom: 5px; }
            .date { color: #9ca3af; font-size: 0.9em; }
            .description { line-height: 1.6; color: #374151; margin-top: 8px; }
            .description ul { list-style: none; margin: 0; padding: 0; }
            .description li { display: block; margin-bottom: 4px; }
            .skills { display: flex; flex-wrap: wrap; gap: 10px; }
            .skill { color: #374151; font-size: 0.95em; }
            .skill:not(:last-child)::after { content: "•"; margin-left: 10px; color: #9ca3af; }
          </style>
        `;
      
      case 'professional':
        return `
          <style>
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 25px; background: white; }
            .header { border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 30px; }
            .name { font-size: 2.4em; font-weight: bold; color: #1e40af; margin-bottom: 8px; }
            .title { font-size: 1.3em; color: #374151; margin-bottom: 15px; }
            .contact { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
            .contact-item { color: #6b7280; }
            .section { margin-bottom: 28px; }
            .section-title { font-size: 1.4em; font-weight: bold; color: #1e40af; margin-bottom: 18px; border-left: 4px solid #1e40af; padding-left: 12px; }
            .summary { line-height: 1.6; color: #374151; font-size: 1.05em; }
            .experience-item, .education-item { margin-bottom: 22px; }
            .experience-header, .education-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
            .company, .school { font-weight: bold; color: #1f2937; font-size: 1.1em; }
            .position, .degree { font-weight: 500; color: #374151; margin-bottom: 6px; }
            .date { color: #6b7280; font-weight: 500; }
            .description { line-height: 1.5; color: #374151; }
            .description ul { list-style: none; margin: 0; padding: 0; }
            .description li { display: block; margin-bottom: 4px; }
            .skills { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill { background: #dbeafe; color: #1e40af; padding: 6px 14px; border-radius: 20px; font-size: 0.9em; font-weight: 500; }
          </style>
        `;
      
      case 'creative':
        return `
          <style>
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 25px; background: white; }
            .header { text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; }
            .name { font-size: 2.6em; font-weight: bold; margin-bottom: 8px; }
            .title { font-size: 1.2em; opacity: 0.9; margin-bottom: 15px; }
            .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
            .contact-item { opacity: 0.9; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 1.4em; font-weight: bold; color: #667eea; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 8px; }
            .summary { line-height: 1.7; color: #374151; font-size: 1.05em; }
            .experience-item, .education-item { margin-bottom: 25px; padding: 15px; border-left: 3px solid #667eea; background: #f8fafc; }
            .experience-header, .education-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
            .company, .school { font-weight: bold; color: #1f2937; font-size: 1.1em; }
            .position, .degree { font-weight: 500; color: #374151; margin-bottom: 6px; }
            .date { color: #6b7280; font-weight: 500; }
            .description { line-height: 1.6; color: #374151; }
            .description ul { list-style: none; margin: 0; padding: 0; }
            .description li { display: block; margin-bottom: 4px; }
            .skills { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 6px 14px; border-radius: 20px; font-size: 0.9em; font-weight: 500; }
          </style>
        `;
      
      default:
        return `
          <style>
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; background: white; }
            .header { text-align: center; margin-bottom: 30px; }
            .name { font-size: 2.5em; font-weight: bold; color: #1f2937; margin-bottom: 5px; }
            .title { font-size: 1.2em; color: #6b7280; margin-bottom: 15px; }
            .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
            .contact-item { color: #6b7280; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 1.3em; font-weight: bold; color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px; }
            .summary { line-height: 1.6; color: #374151; }
            .experience-item, .education-item { margin-bottom: 20px; }
            .experience-header, .education-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
            .company, .school { font-weight: bold; color: #1f2937; }
            .position, .degree { font-weight: 500; color: #374151; margin-bottom: 5px; }
            .date { color: #6b7280; font-size: 0.9em; }
            .description { line-height: 1.5; color: #374151; }
            .description ul { list-style: none; margin: 0; padding: 0; }
            .description li { display: block; margin-bottom: 4px; }
            .skills { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill { background: #f3f4f6; padding: 4px 12px; border-radius: 15px; font-size: 0.9em; color: #374151; }
          </style>
        `;
    }
  };

  // Generate HTML based on template
  if (templateData?.hasPhoto) {
    // Template-specific layouts for photo-enabled templates
    switch (template) {
      case 'neutral-simple':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resume</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              @page {
                size: A4;
                margin: 0;
              }
              
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                .page {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                }
              }
              
              body { 
                font-family: 'Inter', sans-serif; 
                margin: 0; 
                padding: 0; 
                background: #f6f5f4; 
                color: #6b5d47;
                line-height: 1.6;
                font-size: 14px;
                width: 100%;
                min-height: 100vh;
              }
              
              .page {
                width: 100%;
                min-height: 100vh;
                background: #f6f5f4;
                display: flex;
                margin: 0;
                padding: 0;
                position: relative;
              }
              
              .sidebar {
                width: 35%;
                background: #f6f5f4;
                color: #6b5d47;
                padding: 32px;
                position: relative;
                display: flex;
                flex-direction: column;
                margin: 20px 0;
                padding-top: 0;
              }
              
              .profile-picture-container {
                margin-bottom: 24px;
                padding-top: 32px;
                position: relative;
              }
              
              .sidebar::after {
                content: '';
                position: absolute;
                top: 32px;
                right: 0;
                width: 1px;
                height: calc(100% - 64px);
                background: #d1ccc0;
              }
              
              .main-content {
                flex: 1;
                background: #f6f5f4;
                padding: 48px;
                position: relative;
                margin: 20px 0;
              }
              
              .profile-picture-container {
                margin-bottom: 24px;
              }
              
              .profile-picture {
                width: 128px;
                height: 160px;
                background: #d1ccc0;
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5em;
                font-weight: bold;
                color: #8b7355;
              }
              
              .profile-picture img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              
              .signature {
                height: 32px;
                display: flex;
                align-items: flex-end;
              }
              
              .signature-text {
                color: #8b7355;
                font-style: italic;
                font-size: 18px;
                font-family: cursive;
              }
              
              .sidebar-section {
                margin-bottom: 32px;
              }
              
              .sidebar-section:last-child {
                margin-bottom: 0;
              }
              
              .section-title {
                font-size: 12px;
                font-weight: 500;
                color: #8b7355;
                letter-spacing: 0.2em;
                margin-bottom: 16px;
                text-transform: uppercase;
                font-family: 'Open Sans', sans-serif;
              }
              
              .section-divider {
                height: 1px;
                background: #d1ccc0;
                margin: 20px 0 25px 0;
              }
              
              .contact-item {
                display: flex;
                align-items: center;
                color: #6b5d47;
                font-size: 12px;
                margin-bottom: 12px;
              }
              
              .contact-item:last-child {
                margin-bottom: 0;
              }
              
              .contact-icon {
                margin-right: 8px;
              }
              
              .skills-list {
                list-style: none;
              }
              
              .skills-list li {
                color: #6b5d47;
                font-size: 12px;
                margin-bottom: 8px;
              }
              
              .skills-list li:last-child {
                margin-bottom: 0;
              }
              
              .main-header {
                margin-bottom: 32px;
              }
              
              .main-name {
                font-size: 24px;
                font-weight: 400;
                color: #8b7355;
                letter-spacing: 0.2em;
                margin-bottom: 8px;
                text-transform: uppercase;
              }
              
              .main-title {
                font-size: 14px;
                color: #6b5d47;
                margin-bottom: 16px;
              }
              
              .header-divider {
                width: 100%;
                height: 1px;
                background: #8b7355;
              }
              
              .main-section {
                margin-bottom: 32px;
              }
              
              .main-section:last-child {
                margin-bottom: 0;
              }
              
              .main-section-title {
                font-size: 14px;
                font-weight: 500;
                color: #8b7355;
                letter-spacing: 0.2em;
                margin-bottom: 16px;
                text-transform: uppercase;
              }
              
              .profile-text {
                color: #6b5d47;
                font-size: 12px;
                line-height: 1.6;
              }
              
              .experience-item {
                margin-bottom: 24px;
              }
              
              .experience-item:last-child {
                margin-bottom: 0;
              }
              
              .job-title {
                font-size: 14px;
                font-weight: 500;
                color: #6b5d47;
                margin-bottom: 4px;
              }
              
              .company-date {
                font-size: 12px;
                color: #8b7355;
                font-style: italic;
                margin-bottom: 12px;
              }
              
              .description {
                color: #6b5d47;
                font-size: 12px;
                line-height: 1.6;
              }
              
              .description ul {
                list-style: none;
              }
              
              .description li {
                display: block;
                margin-bottom: 4px;
              }
              
              .description li:last-child {
                margin-bottom: 0;
              }
              
              .education-item {
                margin-bottom: 16px;
              }
              
              .education-item:last-child {
                margin-bottom: 0;
              }
              
              .degree {
                font-size: 14px;
                font-weight: 500;
                color: #6b5d47;
                margin-bottom: 4px;
              }
              
              .school-date {
                font-size: 12px;
                color: #8b7355;
                font-style: italic;
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="sidebar">
                <div class="profile-picture-container">
                  <div class="profile-picture">
                    ${personalInfo.photo ? `<img src="${personalInfo.photo}" alt="Profile Picture" style="transform: scale(${personalInfo.photoAdjustments?.scale || 1}) translate(${personalInfo.photoAdjustments?.translateX || 0}px, ${personalInfo.photoAdjustments?.translateY || 0}px) rotate(${personalInfo.photoAdjustments?.rotation || 0}deg);">` : getInitials(personalInfo.name)}
                  </div>
                  <div class="signature">
                    <div class="signature-text">${getFirstName(personalInfo.name)}</div>
                  </div>
                </div>
                
                <div class="sidebar-section">
                  <div class="section-title">Contact</div>
                  <div class="contact-item">
                    <span class="contact-icon">📞</span>
                    <span>${personalInfo.phone}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">✉️</span>
                    <span>${personalInfo.email}</span>
                  </div>
                  ${personalInfo.location ? `
                    <div class="contact-item">
                      <span class="contact-icon">📍</span>
                      <span>${personalInfo.location}</span>
                    </div>
                  ` : ''}
                  ${personalInfo.linkedin ? `
                    <div class="contact-item">
                      <span class="contact-icon">🌐</span>
                      <span>${personalInfo.linkedin}</span>
                    </div>
                  ` : ''}
                </div>

                ${skills && skills.length > 0 ? `
                  <div class="sidebar-section">
                    <div class="section-title">Expertise</div>
                    <ul class="skills-list">
                      ${skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div class="sidebar-section">
                  <div class="section-title">Software Knowledge</div>
                  <ul class="skills-list">
                    <li>Graphic Design Software</li>
                    <li>Software for Design</li>
                    <li>Another Software</li>
                    <li>Team Communication Software</li>
                    <li>Graphics Software</li>
                  </ul>
                </div>

                <div class="sidebar-section">
                  <div class="section-title">Personal Skills</div>
                  <ul class="skills-list">
                    <li>Creativity</li>
                    <li>Team building</li>
                    <li>Communication</li>
                    <li>Problem Solving</li>
                    <li>Leadership</li>
                  </ul>
                </div>
              </div>

              <div class="main-content">
                <div class="main-header">
                                  <div class="main-name">${getPlaceholderOrEmpty(personalInfo.name, 'Your Name')}</div>
                <div class="main-title">${getPlaceholderOrEmpty(personalInfo.title, 'Professional Title')}</div>
                  <div class="header-divider"></div>
                </div>

                ${summary ? `
                  <div class="main-section">
                    <div class="main-section-title">Personal Profile</div>
                    <div class="profile-text">${summary}</div>
                    <div class="section-divider"></div>
                  </div>
                ` : ''}

                ${experience && experience.length > 0 ? `
                  <div class="main-section">
                    <div class="main-section-title">Work Experience</div>
                    ${experience.map(exp => `
                      <div class="experience-item">
                        <div class="job-title">${exp.position.toUpperCase()}</div>
                        <div class="company-date">${exp.company} | ${exp.startDate} - ${exp.endDate || 'Present'}</div>
                        <div class="description">
                          <ul>
                            ${exp.description.map(bullet => `<li>- ${bullet.trim()}</li>`).join('')}
                          </ul>
                        </div>
                      </div>
                    `).join('')}
                    <div class="section-divider"></div>
                  </div>
                ` : ''}

                ${education && education.length > 0 ? `
                  <div class="main-section">
                    <div class="main-section-title">Education</div>
                    ${education.map(edu => `
                      <div class="education-item">
                        <div class="degree">${edu.degree.toUpperCase()}${edu.field ? ` IN ${edu.field.toUpperCase()}` : ''}</div>
                        <div class="school-date">${edu.school} | ${edu.graduationYear}</div>
                      </div>
                    `).join('')}
                    <div class="section-divider"></div>
                  </div>
                ` : ''}
              </div>
            </div>
          </body>
          </html>
        `;

      case 'simple-professional':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resume</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              @page {
                size: A4;
                margin: 0;
              }
              
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                .page {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                }
              }
              
              body { 
                font-family: 'Inter', sans-serif; 
                margin: 0; 
                padding: 32px; 
                background: #e8e1db; 
                color: #374151;
                line-height: 1.6;
                font-size: 14px;
                width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: center;
              }
              
              .page {
                width: 100%;
                max-width: 1024px;
                background: white;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                display: flex;
                margin: 0;
                padding: 0;
                position: relative;
              }
              
              .sidebar {
                width: 320px;
                background: white;
                border: 2px solid #1f2937;
                color: #374151;
                position: relative;
              }
              
              .main-content {
                flex: 1;
                background: white;
                padding: 32px;
                position: relative;
              }
              
              .profile-picture-container {
                padding: 24px;
                border-bottom: 1px solid #d1d5db;
              }
              
              .profile-picture {
                width: 192px;
                height: 224px;
                border: 2px solid #1f2937;
                overflow: hidden;
                background: #f3f4f6;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5em;
                font-weight: bold;
                color: #6b7280;
              }
              
              .profile-picture img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              
              .sidebar-section {
                padding: 24px;
                border-bottom: 1px solid #d1d5db;
              }
              
              .sidebar-section:last-child {
                border-bottom: none;
              }
              
              .section-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 16px;
                background: #e5e7eb;
                padding: 8px 12px;
                color: #1f2937;
              }
              
              .contact-item {
                display: flex;
                align-items: center;
                gap: 12px;
                color: #374151;
                font-size: 14px;
                margin-bottom: 16px;
              }
              
              .contact-item:last-child {
                margin-bottom: 0;
              }
              
              .contact-icon {
                color: #6b7280;
              }
              
              .education-item {
                margin-bottom: 16px;
              }
              
              .education-item:last-child {
                margin-bottom: 0;
              }
              
              .degree {
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 4px;
              }
              
              .school {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 4px;
              }
              
              .graduation-year {
                font-size: 14px;
                color: #6b7280;
              }
              
              .skills-list {
                list-style: none;
              }
              
              .skills-list li {
                color: #374151;
                font-size: 14px;
                margin-bottom: 8px;
              }
              
              .skills-list li:last-child {
                margin-bottom: 0;
              }
              
              .main-header {
                margin-bottom: 32px;
              }
              
              .main-name {
                font-size: 36px;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 8px;
              }
              
              .main-title {
                font-size: 18px;
                color: #6b7280;
                margin-bottom: 24px;
              }
              
              .main-section {
                margin-bottom: 32px;
              }
              
              .main-section:last-child {
                margin-bottom: 0;
              }
              
              .section-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 16px;
              }
              
              .section-icon {
                color: #6b7280;
              }
              
              .main-section-title {
                font-size: 20px;
                font-weight: 600;
                color: #1f2937;
              }
              
              .profile-text {
                color: #374151;
                font-size: 14px;
                line-height: 1.6;
              }
              
              .experience-item {
                margin-bottom: 24px;
                display: flex;
                gap: 24px;
              }
              
              .experience-item:last-child {
                margin-bottom: 0;
              }
              
              .experience-dates {
                width: 64px;
                font-size: 14px;
                color: #6b7280;
              }
              
              .experience-content {
                flex: 1;
              }
              
              .company {
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 4px;
              }
              
              .position {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 8px;
              }
              
              .description {
                color: #374151;
                font-size: 14px;
              }
              
              .description ul {
                list-style: none;
              }
              
                          .description li {
              display: block;
              margin-bottom: 4px;
            }
              
              .description li:last-child {
                margin-bottom: 0;
              }
              
              .references-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 32px;
              }
              
              .reference-item {
                margin-bottom: 16px;
              }
              
              .reference-name {
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 8px;
              }
              
              .reference-title {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 12px;
              }
              
              .reference-contact {
                display: flex;
                gap: 8px;
                margin-bottom: 4px;
              }
              
              .reference-label {
                font-size: 12px;
                color: #6b7280;
                font-weight: 500;
                min-width: 40px;
              }
              
              .reference-value {
                font-size: 12px;
                color: #6b7280;
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="sidebar">
                <div class="profile-picture-container">
                  <div class="profile-picture">
                    ${personalInfo.photo ? `<img src="${personalInfo.photo}" alt="Profile Picture" style="transform: scale(${personalInfo.photoAdjustments?.scale || 1}) translate(${personalInfo.photoAdjustments?.translateX || 0}px, ${personalInfo.photoAdjustments?.translateY || 0}px) rotate(${personalInfo.photoAdjustments?.rotation || 0}deg);">` : getInitials(personalInfo.name)}
                  </div>
                </div>
                
                <div class="sidebar-section">
                  <div class="contact-item">
                    <span class="contact-icon">📞</span>
                    <span>${personalInfo.phone}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">✉️</span>
                    <span>${personalInfo.email}</span>
                  </div>
                  ${personalInfo.linkedin ? `
                    <div class="contact-item">
                      <span class="contact-icon">🌐</span>
                      <span>${personalInfo.linkedin}</span>
                    </div>
                  ` : ''}
                  ${personalInfo.location ? `
                    <div class="contact-item">
                      <span class="contact-icon">📍</span>
                      <span>${personalInfo.location}</span>
                    </div>
                  ` : ''}
                </div>

                ${education && education.length > 0 ? `
                  <div class="sidebar-section">
                    <div class="section-title">Education</div>
                    ${education.map(edu => `
                      <div class="education-item">
                        <div class="degree">${edu.degree}${edu.field ? ` IN ${edu.field}` : ''}</div>
                        <div class="school">${edu.school}</div>
                        <div class="graduation-year">${edu.graduationYear}</div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${skills && skills.length > 0 ? `
                  <div class="sidebar-section">
                    <div class="section-title">Expertise</div>
                    <ul class="skills-list">
                      ${skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div class="sidebar-section">
                  <div class="section-title">Language</div>
                  <ul class="skills-list">
                    <li>English</li>
                    <li>French</li>
                  </ul>
                </div>
              </div>

              <div class="main-content">
                <div class="main-header">
                  <div class="main-name">${getPlaceholderOrEmpty(personalInfo.name, 'Your Name')}</div>
                  <div class="main-title">${getPlaceholderOrEmpty(personalInfo.title, 'Professional Title')}</div>
                </div>

                ${summary ? `
                  <div class="main-section">
                    <div class="section-header">
                      <span class="section-icon">👤</span>
                      <div class="main-section-title">Profile</div>
                    </div>
                    <div class="profile-text">${summary}</div>
                  </div>
                ` : ''}

                ${experience && experience.length > 0 ? `
                  <div class="main-section">
                    <div class="section-header">
                      <span class="section-icon">📋</span>
                      <div class="main-section-title">Work Experience</div>
                    </div>
                    ${experience.map(exp => `
                      <div class="experience-item">
                        <div class="experience-dates">
                          <div>${exp.startDate.split(' ')[1] || exp.startDate}</div>
                          <div>-</div>
                          <div>${exp.endDate ? (exp.endDate.split(' ')[1] || exp.endDate) : 'Present'}</div>
                        </div>
                        <div class="experience-content">
                          <div class="company">${exp.company}</div>
                          <div class="position">${exp.position}</div>
                          <div class="description">
                            <ul>
                              ${exp.description.map(bullet => `<li>• ${bullet.trim()}</li>`).join('')}
                            </ul>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                <div class="main-section">
                  <div class="section-header">
                    <span class="section-icon">📧</span>
                    <div class="main-section-title">References</div>
                  </div>
                  <div class="references-grid">
                    <div class="reference-item">
                      <div class="reference-name">Bailey Dupont</div>
                      <div class="reference-title">Wardiere Inc. / CEO</div>
                      <div class="reference-contact">
                        <span class="reference-label">Phone:</span>
                        <span class="reference-value">123-456-7890</span>
                      </div>
                      <div class="reference-contact">
                        <span class="reference-label">Email:</span>
                        <span class="reference-value">hello@reallygreatsite.com</span>
                      </div>
                    </div>
                    <div class="reference-item">
                      <div class="reference-name">Harumi Kobayashi</div>
                      <div class="reference-title">Wardiere Inc. / CEO</div>
                      <div class="reference-contact">
                        <span class="reference-label">Phone:</span>
                        <span class="reference-value">123-456-7890</span>
                      </div>
                      <div class="reference-contact">
                        <span class="reference-label">Email:</span>
                        <span class="reference-value">hello@reallygreatsite.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

      case 'blue-simple':
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
              
              @page {
                size: A4;
                margin: 0;
              }
              
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                }
                .page {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
                }
              }
              
              body { 
                font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                margin: 0; 
                padding: 0; 
                background: #ffffff; 
                color: #1f2937;
                line-height: 1.6;
                font-size: 14px;
                width: 100%;
                height: 100%;
                overflow: hidden;
              }
              
              .page {
                width: 100%;
                height: 100vh;
                background: white;
                display: flex;
                margin: 0;
                padding: 0;
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
                font-size: 14px;
                font-weight: 500;
                color: #6b7280;
                margin-bottom: 5px;
                font-family: 'Inter', sans-serif;
              }
              
              .date {
                font-size: 12px;
                color: #9ca3af;
                font-weight: 600;
                background: #f3f4f6;
                padding: 3px 10px;
                border-radius: 12px;
                white-space: nowrap;
                font-family: 'Inter', sans-serif;
              }
              
              .description {
                font-size: 13px;
                line-height: 1.6;
                color: #4b5563;
                font-weight: 400;
              }
              
              .reference-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
              }
              
              .reference-item {
                font-size: 13px;
              }
              
              .reference-name {
                font-weight: 700;
                color: #374151;
                margin-bottom: 3px;
                font-family: 'Inter', sans-serif;
              }
              
              .reference-title {
                color: #6b7280;
                margin-bottom: 3px;
                font-weight: 500;
              }
              
              .reference-contact {
                color: #9ca3af;
                font-size: 12px;
                font-weight: 400;
              }
              
              @media print {
                .page {
                  box-shadow: none;
                  margin: 0;
                }
                
                .sidebar {
                  -webkit-print-color-adjust: exact;
                  color-adjust: exact;
                }
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="sidebar">
                <div class="profile-picture">
                  ${personalInfo.photo ? `<img src="${personalInfo.photo}" alt="Profile Picture" style="transform: scale(${personalInfo.photoAdjustments?.scale || 1}) translate(${personalInfo.photoAdjustments?.translateX || 0}px, ${personalInfo.photoAdjustments?.translateY || 0}px) rotate(${personalInfo.photoAdjustments?.rotation || 0}deg);">` : getInitials(personalInfo.name)}
                </div>
                
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

                <div class="sidebar-section">
                  <div class="sidebar-title">Languages</div>
                  <ul class="languages-list">
                    <li>English (Fluent)</li>
                    <li>Spanish (Fluent)</li>
                  </ul>
                </div>
              </div>

              <div class="main-content">
                <div class="main-header">
                  <div class="name"><strong>${getPlaceholderOrEmpty(personalInfo.name, 'Your Name')}</strong></div>
                  <div class="title">${getPlaceholderOrEmpty(personalInfo.title, 'Professional Title')}</div>
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

                <div class="main-section">
                  <div class="main-section-title">Reference</div>
                  <div class="reference-grid">
                    <div class="reference-item">
                      <div class="reference-name">John Smith</div>
                      <div class="reference-title">Senior Manager, Tech Corp</div>
                      <div class="reference-contact">📱 +1 (555) 123-4567</div>
                      <div class="reference-contact">📧 john.smith@techcorp.com</div>
                    </div>
                    <div class="reference-item">
                      <div class="reference-name">Jane Doe</div>
                      <div class="reference-title">Director, Innovation Inc</div>
                      <div class="reference-contact">📱 +1 (555) 987-6543</div>
                      <div class="reference-contact">📧 jane.doe@innovation.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

      default:
        // Fallback to sidebar layout for other photo templates
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resume</title>
            <style>
              body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background: white; }
              .container { display: flex; min-height: 100vh; }
              .sidebar { width: 280px; background: #1f2937; color: white; padding: 30px 25px; }
              .main-content { flex: 1; padding: 30px 35px; }
              .profile-picture { width: 120px; height: 120px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 2.5em; font-weight: bold; margin: 0 auto 25px; color: white; }
              .profile-picture img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
              .name { font-size: 1.8em; font-weight: bold; margin-bottom: 8px; text-align: center; }
              .title { font-size: 1.1em; color: #9ca3af; margin-bottom: 25px; text-align: center; }
              .contact-info { margin-bottom: 30px; }
              .contact-item { margin-bottom: 12px; font-size: 0.95em; color: #d1d5db; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 1.2em; font-weight: bold; color: #f9fafb; margin-bottom: 15px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
              .skills { display: flex; flex-direction: column; gap: 8px; }
              .skill { background: #374151; padding: 6px 12px; border-radius: 15px; font-size: 0.9em; }
              .main-section { margin-bottom: 30px; }
              .main-section-title { font-size: 1.5em; font-weight: bold; color: #1f2937; margin-bottom: 20px; border-bottom: 3px solid #3b82f6; padding-bottom: 8px; }
              .experience-item, .education-item { margin-bottom: 25px; }
              .experience-header, .education-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
              .company, .school { font-weight: bold; color: #1f2937; font-size: 1.1em; }
              .position, .degree { font-weight: 500; color: #374151; margin-bottom: 6px; }
              .date { color: #6b7280; font-weight: 500; }
              .description { line-height: 1.6; color: #374151; }
              .summary { line-height: 1.6; color: #374151; font-size: 1.05em; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="sidebar">
                <div class="profile-picture">
                  ${personalInfo.photo ? `<img src="${personalInfo.photo}" alt="Profile Picture" style="transform: scale(${personalInfo.photoAdjustments?.scale || 1}) translate(${personalInfo.photoAdjustments?.translateX || 0}px, ${personalInfo.photoAdjustments?.translateY || 0}px) rotate(${personalInfo.photoAdjustments?.rotation || 0}deg);">` : getInitials(personalInfo.name)}
                </div>
                <div class="name">${getPlaceholderOrEmpty(personalInfo.name, 'Your Name')}</div>
                <div class="title">${getPlaceholderOrEmpty(personalInfo.title, 'Professional Title')}</div>
                
                <div class="contact-info">
                  <div class="contact-item">📧 ${personalInfo.email}</div>
                  <div class="contact-item">📱 ${personalInfo.phone}</div>
                  ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
                  ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
                </div>

                ${skills && skills.length > 0 ? `
                  <div class="section">
                    <div class="section-title">Skills</div>
                    <div class="skills">
                      ${skills.map(skill => `
                        <div class="skill">${skill}</div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>

              <div class="main-content">
                ${summary ? `
                  <div class="main-section">
                    <div class="main-section-title">Professional Summary</div>
                    <div class="summary">${summary}</div>
                  </div>
                ` : ''}

                ${experience && experience.length > 0 ? `
                  <div class="main-section">
                    <div class="main-section-title">Professional Experience</div>
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
                  <div class="main-section">
                    <div class="main-section-title">Education</div>
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
              </div>
            </div>
          </body>
          </html>
        `;
    }
  }

  // Standard template layout
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
        <div class="name">${getPlaceholderOrEmpty(personalInfo.name, 'Your Name')}</div>
        <div class="title">${getPlaceholderOrEmpty(personalInfo.title, 'Professional Title')}</div>
        <div class="contact">
          <div class="contact-item">📧 ${getPlaceholderOrEmpty(personalInfo.email, 'your.email@example.com')}</div>
          <div class="contact-item">📱 ${getPlaceholderOrEmpty(personalInfo.phone, '+1 (555) 123-4567')}</div>
          ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
          ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary">${getPlaceholderOrEmpty(summary || '', 'Experienced professional with a proven track record of success. Skilled in [your key skills] with expertise in [your areas of specialization]. Passionate about delivering high-quality results and driving innovation in [your industry/field].')}</div>
      </div>

      <div class="section">
        <div class="section-title">Professional Experience</div>
        ${experience && experience.length > 0 ? experience.map(exp => `
          <div class="experience-item">
            <div class="experience-header">
              <div class="company">${exp.company}</div>
              <div class="date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
            </div>
            <div class="position">${exp.position}</div>
            <div class="description">${exp.description}</div>
          </div>
        `).join('') : `<div class="experience-item">
          <div class="experience-header">
            <div class="company">${getPlaceholderOrEmpty('', 'Company Name')}</div>
            <div class="date">${getPlaceholderOrEmpty('', 'Start Date')} - ${getPlaceholderOrEmpty('', 'End Date')}</div>
          </div>
          <div class="position">${getPlaceholderOrEmpty('', 'Job Title')}</div>
          <div class="description">${getPlaceholderOrEmpty('', 'Describe your key responsibilities and achievements in this role. Highlight specific projects, technologies used, and measurable outcomes.')}</div>
        </div>`}
      </div>

      <div class="section">
        <div class="section-title">Education</div>
        ${education && education.length > 0 ? education.map(edu => `
          <div class="education-item">
            <div class="education-header">
              <div class="school">${edu.school}</div>
              <div class="date">${edu.graduationYear}</div>
            </div>
            <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
            ${edu.gpa ? `<div class="description">GPA: ${edu.gpa}</div>` : ''}
          </div>
        `).join('') : `<div class="education-item">
          <div class="education-header">
            <div class="school">${getPlaceholderOrEmpty('', 'University Name')}</div>
            <div class="date">${getPlaceholderOrEmpty('', 'Graduation Year')}</div>
          </div>
          <div class="degree">${getPlaceholderOrEmpty('', 'Degree')} in ${getPlaceholderOrEmpty('', 'Field of Study')}</div>
        </div>`}
      </div>

      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
          ${skills && skills.length > 0 ? skills.map(skill => `
            <span class="skill">${skill}</span>
          `).join('') : `<span class="skill">${getPlaceholderOrEmpty('', 'Skill 1')}</span>
          <span class="skill">${getPlaceholderOrEmpty('', 'Skill 2')}</span>
          <span class="skill">${getPlaceholderOrEmpty('', 'Skill 3')}</span>
          <span class="skill">${getPlaceholderOrEmpty('', 'Skill 4')}</span>
          <span class="skill">${getPlaceholderOrEmpty('', 'Skill 5')}</span>`}
        </div>
      </div>
    </body>
    </html>
  `;
} 