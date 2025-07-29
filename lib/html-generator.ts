import { ResumeData } from '@/types/resume';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';

export function generateHTML(data: ResumeData, template: string = 'modern'): string {
  const { personalInfo, summary, experience, education, skills } = data;

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
              body { 
                font-family: 'Inter', sans-serif; 
                margin: 0; 
                padding: 30px; 
                background: white; 
                color: #333;
                line-height: 1.6;
              }
              .header { 
                display: flex; 
                align-items: center; 
                margin-bottom: 40px; 
                gap: 30px;
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
                overflow: hidden;
                flex-shrink: 0;
              }
              .profile-picture img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .header-info {
                flex: 1;
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
                margin-bottom: 15px; 
              }
              .contact { 
                display: flex; 
                gap: 25px; 
                flex-wrap: wrap; 
                font-size: 0.95em;
                color: #6b7280;
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
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 8px;
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
          </head>
          <body>
            <div class="header">
              <div class="profile-picture">
                ${personalInfo.photo ? `<img src="${personalInfo.photo}" alt="Profile Picture" style="transform: scale(${personalInfo.photoAdjustments?.scale || 1}) translate(${personalInfo.photoAdjustments?.translateX || 0}px, ${personalInfo.photoAdjustments?.translateY || 0}px) rotate(${personalInfo.photoAdjustments?.rotation || 0}deg);">` : personalInfo.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div class="header-info">
                <div class="name">${personalInfo.name}</div>
                <div class="title">${personalInfo.title}</div>
                <div class="contact">
                  <div class="contact-item">📧 ${personalInfo.email}</div>
                  <div class="contact-item">📱 ${personalInfo.phone}</div>
                  ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
                  ${personalInfo.linkedin ? `<div class="contact-item">💼 ${personalInfo.linkedin}</div>` : ''}
                </div>
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
                  ${personalInfo.photo ? `<img src="${personalInfo.photo}" alt="Profile Picture" style="transform: scale(${personalInfo.photoAdjustments?.scale || 1}) translate(${personalInfo.photoAdjustments?.translateX || 0}px, ${personalInfo.photoAdjustments?.translateY || 0}px) rotate(${personalInfo.photoAdjustments?.rotation || 0}deg);">` : personalInfo.name.split(' ').map(n => n[0]).join('').toUpperCase()}
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
                  <div class="name"><strong>${personalInfo.name}</strong></div>
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
                  ${personalInfo.photo ? `<img src="${personalInfo.photo}" alt="Profile Picture" style="transform: scale(${personalInfo.photoAdjustments?.scale || 1}) translate(${personalInfo.photoAdjustments?.translateX || 0}px, ${personalInfo.photoAdjustments?.translateY || 0}px) rotate(${personalInfo.photoAdjustments?.rotation || 0}deg);">` : personalInfo.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div class="name">${personalInfo.name}</div>
                <div class="title">${personalInfo.title}</div>
                
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