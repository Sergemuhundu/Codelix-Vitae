export interface SkillCategory {
  name: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming & Development',
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby',
      'Go', 'Rust', 'Swift', 'Kotlin', 'Dart', 'R', 'MATLAB', 'Scala', 'Elixir', 'Clojure',
      'HTML5', 'CSS3', 'Sass', 'Less', 'Bootstrap', 'Tailwind CSS', 'Material-UI', 'Ant Design',
      'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 'Express.js', 'Django',
      'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'FastAPI', 'GraphQL',
      'REST APIs', 'WebSockets', 'Microservices', 'Docker', 'Kubernetes', 'AWS', 'Azure',
      'Google Cloud', 'Firebase', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
      'Git', 'GitHub', 'GitLab', 'Bitbucket', 'CI/CD', 'Jenkins', 'Travis CI', 'CircleCI',
      'Jest', 'Mocha', 'Cypress', 'Selenium', 'Postman', 'Swagger', 'Jira', 'Confluence',
      'Agile', 'Scrum', 'Kanban', 'DevOps', 'Linux', 'Unix', 'Shell Scripting', 'Bash'
    ]
  },
  {
    name: 'Customer Service',
    skills: [
      'Customer Support', 'Client Relations', 'Problem Resolution', 'Conflict Resolution',
      'Active Listening', 'Empathy', 'Patience', 'Communication Skills', 'Interpersonal Skills',
      'Phone Support', 'Email Support', 'Live Chat Support', 'Ticket Management', 'CRM Systems',
      'Zendesk', 'Salesforce', 'Freshdesk', 'Intercom', 'Help Scout', 'Customer Satisfaction',
      'Customer Retention', 'Upselling', 'Cross-selling', 'Product Knowledge', 'Technical Support',
      'Billing Support', 'Refund Processing', 'Order Management', 'Inventory Management',
      'Multi-tasking', 'Time Management', 'Stress Management', 'Team Collaboration',
      'Training & Development', 'Quality Assurance', 'Performance Metrics', 'KPI Tracking',
      'Customer Feedback', 'Survey Administration', 'Complaint Handling', 'Escalation Management',
      'Documentation', 'Process Improvement', 'Customer Journey Mapping', 'Service Recovery',
      'Multilingual Support', 'Cultural Sensitivity', 'Accessibility Support', 'Social Media Support'
    ]
  },
  {
    name: 'Sales & Marketing',
    skills: [
      'Sales Strategy', 'Lead Generation', 'Prospecting', 'Cold Calling', 'Sales Presentations',
      'Negotiation', 'Closing Techniques', 'Account Management', 'Relationship Building',
      'CRM Software', 'Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Sales Analytics',
      'Pipeline Management', 'Forecasting', 'Sales Training', 'Mentoring', 'Team Leadership',
      'Digital Marketing', 'Social Media Marketing', 'Content Marketing', 'Email Marketing',
      'SEO', 'SEM', 'PPC', 'Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Marketing Automation',
      'HubSpot', 'Mailchimp', 'Constant Contact', 'Analytics', 'Google Analytics', 'Conversion Optimization',
      'A/B Testing', 'Market Research', 'Competitive Analysis', 'Brand Management', 'Event Marketing',
      'Trade Shows', 'Public Relations', 'Media Relations', 'Press Releases', 'Influencer Marketing',
      'Affiliate Marketing', 'Retargeting', 'Marketing Strategy', 'Campaign Management', 'ROI Analysis'
    ]
  },
  {
    name: 'Business & Management',
    skills: [
      'Project Management', 'Strategic Planning', 'Business Analysis', 'Process Improvement',
      'Change Management', 'Risk Management', 'Financial Analysis', 'Budgeting', 'Forecasting',
      'Data Analysis', 'Business Intelligence', 'Tableau', 'Power BI', 'Excel', 'SQL',
      'Leadership', 'Team Management', 'Performance Management', 'Employee Development',
      'Recruitment', 'HR Management', 'Training & Development', 'Organizational Development',
      'Operations Management', 'Supply Chain Management', 'Logistics', 'Quality Management',
      'Six Sigma', 'Lean Management', 'Agile', 'Scrum', 'Kanban', 'Stakeholder Management',
      'Vendor Management', 'Contract Negotiation', 'Compliance', 'Regulatory Affairs',
      'Corporate Governance', 'Business Strategy', 'Market Analysis', 'Competitive Intelligence',
      'Product Management', 'Program Management', 'Portfolio Management', 'Resource Planning'
    ]
  },
  {
    name: 'Healthcare & Medical',
    skills: [
      'Patient Care', 'Medical Terminology', 'Clinical Documentation', 'Electronic Health Records',
      'Epic', 'Cerner', 'Medical Billing', 'Coding', 'ICD-10', 'CPT Codes', 'Insurance Verification',
      'Prior Authorization', 'Claims Processing', 'Medical Transcription', 'Patient Scheduling',
      'Appointment Management', 'Vital Signs', 'Phlebotomy', 'EKG', 'X-ray', 'Laboratory Procedures',
      'Infection Control', 'HIPAA Compliance', 'Patient Safety', 'Quality Assurance', 'Clinical Research',
      'Data Collection', 'Statistical Analysis', 'Medical Writing', 'Regulatory Compliance',
      'FDA Regulations', 'Clinical Trials', 'Protocol Development', 'Informed Consent',
      'Medical Device Support', 'Pharmaceutical Knowledge', 'Drug Interactions', 'Dosage Calculations',
      'Emergency Response', 'CPR', 'First Aid', 'Telemedicine', 'Remote Patient Monitoring'
    ]
  },
  {
    name: 'Education & Training',
    skills: [
      'Curriculum Development', 'Lesson Planning', 'Instructional Design', 'Educational Technology',
      'Learning Management Systems', 'Moodle', 'Canvas', 'Blackboard', 'Google Classroom',
      'Student Assessment', 'Grading', 'Rubric Development', 'Differentiated Instruction',
      'Special Education', 'ESL/EFL Teaching', 'Literacy Development', 'Numeracy Skills',
      'Classroom Management', 'Behavior Management', 'Parent Communication', 'Student Counseling',
      'Academic Advising', 'Career Counseling', 'College Admissions', 'Standardized Testing',
      'Professional Development', 'Teacher Training', 'Mentoring', 'Coaching', 'Educational Research',
      'Data Analysis', 'Assessment Design', 'Educational Psychology', 'Child Development',
      'Adult Learning', 'Online Teaching', 'Hybrid Learning', 'Blended Learning', 'Gamification',
      'Educational Games', 'Multimedia Production', 'Video Creation', 'Podcasting', 'Blogging'
    ]
  },
  {
    name: 'Finance & Accounting',
    skills: [
      'Financial Analysis', 'Budgeting', 'Forecasting', 'Financial Modeling', 'Excel', 'VBA',
      'QuickBooks', 'Sage', 'Xero', 'NetSuite', 'SAP', 'Oracle', 'General Ledger', 'Accounts Payable',
      'Accounts Receivable', 'Payroll', 'Tax Preparation', 'Tax Planning', 'Auditing', 'Internal Controls',
      'Risk Management', 'Compliance', 'GAAP', 'IFRS', 'SOX Compliance', 'Financial Reporting',
      'Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Ratio Analysis', 'Variance Analysis',
      'Cost Accounting', 'Managerial Accounting', 'Investment Analysis', 'Portfolio Management',
      'Trading', 'Derivatives', 'Options', 'Futures', 'Bonds', 'Equity Analysis', 'Credit Analysis',
      'Loan Processing', 'Underwriting', 'Insurance', 'Actuarial Science', 'Financial Planning',
      'Retirement Planning', 'Estate Planning', 'Wealth Management', 'Private Equity', 'Venture Capital'
    ]
  },
  {
    name: 'Design & Creative',
    skills: [
      'Graphic Design', 'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'InDesign', 'XD',
      'Figma', 'Sketch', 'Canva', 'Typography', 'Color Theory', 'Layout Design', 'Brand Identity',
      'Logo Design', 'Print Design', 'Digital Design', 'Web Design', 'UI/UX Design', 'Wireframing',
      'Prototyping', 'User Research', 'Usability Testing', 'Information Architecture', 'Interaction Design',
      'Motion Graphics', 'Animation', 'After Effects', 'Premiere Pro', 'Final Cut Pro', 'Video Editing',
      'Photography', 'Photo Editing', 'Lightroom', 'Camera Operation', 'Lighting', 'Composition',
      '3D Modeling', 'Blender', 'Maya', '3ds Max', 'Cinema 4D', 'Product Design', 'Industrial Design',
      'Fashion Design', 'Interior Design', 'Architecture', 'CAD', 'AutoCAD', 'Revit', 'SketchUp',
      'Illustration', 'Digital Art', 'Concept Art', 'Character Design', 'Storyboarding'
    ]
  },
  {
    name: 'Administrative & Office',
    skills: [
      'Administrative Support', 'Office Management', 'Executive Assistance', 'Calendar Management',
      'Travel Coordination', 'Meeting Planning', 'Event Coordination', 'Document Management',
      'File Organization', 'Data Entry', 'Typing', 'Transcription', 'Proofreading', 'Editing',
      'Microsoft Office', 'Word', 'Excel', 'PowerPoint', 'Outlook', 'Access', 'Google Workspace',
      'Gmail', 'Google Docs', 'Google Sheets', 'Google Slides', 'Project Management', 'Asana',
      'Trello', 'Monday.com', 'Basecamp', 'Slack', 'Microsoft Teams', 'Zoom', 'WebEx',
      'Customer Service', 'Phone Support', 'Email Management', 'Correspondence', 'Report Writing',
      'Presentations', 'Research', 'Data Analysis', 'Database Management', 'Records Management',
      'Compliance', 'Policy Development', 'Procedure Documentation', 'Training Coordination',
      'Vendor Management', 'Procurement', 'Inventory Management', 'Budget Tracking', 'Expense Reports'
    ]
  },
  {
    name: 'Legal & Compliance',
    skills: [
      'Legal Research', 'Case Law', 'Statutory Analysis', 'Contract Review', 'Contract Drafting',
      'Legal Writing', 'Brief Writing', 'Memos', 'Legal Documentation', 'Court Filings',
      'Litigation Support', 'Discovery', 'Document Review', 'E-Discovery', 'Westlaw', 'LexisNexis',
      'Legal Technology', 'Case Management', 'Clio', 'MyCase', 'Practice Management',
      'Client Relations', 'Legal Ethics', 'Professional Responsibility', 'Confidentiality',
      'Conflict of Interest', 'Regulatory Compliance', 'Corporate Law', 'Employment Law',
      'Intellectual Property', 'Trademark', 'Copyright', 'Patent Law', 'Real Estate Law',
      'Family Law', 'Criminal Law', 'Civil Litigation', 'Arbitration', 'Mediation', 'Negotiation',
      'Legal Billing', 'Time Tracking', 'Legal Marketing', 'Business Development', 'Networking'
    ]
  },
  {
    name: 'Science & Research',
    skills: [
      'Laboratory Techniques', 'Data Collection', 'Statistical Analysis', 'R', 'Python', 'MATLAB',
      'SPSS', 'SAS', 'Stata', 'Research Design', 'Experimental Design', 'Hypothesis Testing',
      'Literature Review', 'Scientific Writing', 'Grant Writing', 'Publication', 'Peer Review',
      'Laboratory Safety', 'Quality Control', 'Standard Operating Procedures', 'Equipment Operation',
      'Sample Preparation', 'Analytical Chemistry', 'Chromatography', 'Spectroscopy', 'Microscopy',
      'PCR', 'DNA Sequencing', 'Cell Culture', 'Microbiology', 'Biochemistry', 'Molecular Biology',
      'Genetics', 'Bioinformatics', 'Clinical Research', 'Epidemiology', 'Public Health',
      'Environmental Science', 'Field Research', 'Data Visualization', 'Scientific Computing',
      'Machine Learning', 'Artificial Intelligence', 'Neural Networks', 'Deep Learning'
    ]
  },
  {
    name: 'Media & Communications',
    skills: [
      'Journalism', 'News Writing', 'Feature Writing', 'Copywriting', 'Content Creation',
      'Social Media Management', 'Content Strategy', 'Digital Marketing', 'SEO', 'Email Marketing',
      'Public Relations', 'Media Relations', 'Press Releases', 'Crisis Communications',
      'Brand Management', 'Marketing Communications', 'Advertising', 'Campaign Management',
      'Video Production', 'Photography', 'Photojournalism', 'Video Editing', 'Audio Production',
      'Podcasting', 'Broadcasting', 'Radio', 'Television', 'Streaming', 'Live Production',
      'Event Planning', 'Public Speaking', 'Presentation Skills', 'Interviewing', 'Research',
      'Data Journalism', 'Investigative Reporting', 'Fact-checking', 'Editing', 'Proofreading',
      'Translation', 'Localization', 'Multilingual Content', 'Cultural Sensitivity'
    ]
  },
  {
    name: 'Trades & Technical',
    skills: [
      'Electrical Work', 'Plumbing', 'HVAC', 'Carpentry', 'Welding', 'Machining', 'CNC Operation',
      'AutoCAD', 'Technical Drawing', 'Blueprint Reading', 'Construction', 'Building Codes',
      'Safety Protocols', 'OSHA Compliance', 'Equipment Maintenance', 'Troubleshooting',
      'Repair', 'Installation', 'Assembly', 'Quality Control', 'Inspection', 'Testing',
      'Mechanical Systems', 'Hydraulics', 'Pneumatics', 'Motor Controls', 'Programmable Logic Controllers',
      'Industrial Automation', 'Robotics', 'Precision Measurement', 'Calibration', 'Metrology',
      'Manufacturing', 'Production Planning', 'Inventory Management', 'Supply Chain', 'Logistics',
      'Forklift Operation', 'Heavy Equipment', 'Crane Operation', 'Rigging', 'Scaffolding'
    ]
  },
  {
    name: 'Hospitality & Service',
    skills: [
      'Customer Service', 'Guest Relations', 'Hospitality Management', 'Hotel Operations',
      'Restaurant Management', 'Food Service', 'Culinary Arts', 'Menu Planning', 'Food Safety',
      'HACCP', 'ServSafe', 'Wine Service', 'Bartending', 'Mixology', 'Event Planning',
      'Wedding Planning', 'Catering', 'Banquet Management', 'Concierge Services', 'Front Desk',
      'Reservations', 'Revenue Management', 'Housekeeping', 'Maintenance', 'Security',
      'Tourism', 'Travel Planning', 'Tour Guiding', 'Cultural Knowledge', 'Language Skills',
      'Spa Services', 'Wellness', 'Fitness Training', 'Personal Training', 'Group Fitness',
      'Recreation', 'Entertainment', 'Gaming', 'Casino Operations', 'Cruise Ship Operations'
    ]
  },
  {
    name: 'Transportation & Logistics',
    skills: [
      'Supply Chain Management', 'Logistics', 'Transportation', 'Fleet Management', 'Route Planning',
      'Warehouse Management', 'Inventory Control', 'Order Fulfillment', 'Shipping', 'Receiving',
      'Freight Forwarding', 'Customs', 'Import/Export', 'International Trade', 'Trade Compliance',
      'DOT Regulations', 'CDL', 'Commercial Driving', 'Hazmat', 'Dangerous Goods', 'Safety Training',
      'Dispatch', 'Scheduling', 'GPS Navigation', 'Telematics', 'Fuel Management', 'Maintenance',
      'Trucking', 'Rail Operations', 'Maritime', 'Aviation', 'Air Cargo', 'Passenger Service',
      'Last Mile Delivery', 'E-commerce Fulfillment', '3PL', 'Fourth Party Logistics', 'Cross-docking',
      'JIT', 'Lean Logistics', 'Six Sigma', 'Quality Management', 'Performance Metrics'
    ]
  }
];

// Job role to skills mapping
export const JOB_ROLE_SKILLS: { [key: string]: string[] } = {
  // Customer Service Roles
  'customer service representative': ['Customer Support', 'Client Relations', 'Problem Resolution', 'Phone Support', 'Email Support', 'CRM Systems', 'Active Listening', 'Empathy', 'Communication Skills'],
  'customer service agent': ['Customer Support', 'Client Relations', 'Problem Resolution', 'Phone Support', 'Email Support', 'CRM Systems', 'Active Listening', 'Empathy', 'Communication Skills'],
  'customer support specialist': ['Customer Support', 'Technical Support', 'Problem Resolution', 'Ticket Management', 'Zendesk', 'Active Listening', 'Documentation', 'Process Improvement'],
  'call center agent': ['Phone Support', 'Customer Support', 'Active Listening', 'Multi-tasking', 'Stress Management', 'CRM Systems', 'Call Handling', 'Quality Assurance'],
  'client relations manager': ['Client Relations', 'Account Management', 'Relationship Building', 'Customer Retention', 'Upselling', 'Cross-selling', 'Strategic Planning', 'Team Leadership'],
  
  // Sales Roles
  'sales representative': ['Sales Strategy', 'Lead Generation', 'Prospecting', 'Cold Calling', 'Negotiation', 'Closing Techniques', 'CRM Software', 'Sales Analytics'],
  'sales manager': ['Sales Strategy', 'Team Leadership', 'Sales Training', 'Pipeline Management', 'Forecasting', 'Account Management', 'Sales Analytics', 'Performance Management'],
  'account executive': ['Account Management', 'Relationship Building', 'Sales Presentations', 'Negotiation', 'Strategic Planning', 'Client Relations', 'Revenue Growth'],
  'business development': ['Business Development', 'Lead Generation', 'Strategic Partnerships', 'Market Research', 'Sales Strategy', 'Relationship Building', 'Negotiation'],
  
  // Administrative Roles
  'administrative assistant': ['Administrative Support', 'Office Management', 'Calendar Management', 'Microsoft Office', 'Data Entry', 'Document Management', 'Communication Skills'],
  'executive assistant': ['Executive Assistance', 'Calendar Management', 'Travel Coordination', 'Meeting Planning', 'Project Management', 'Confidentiality', 'Strategic Support'],
  'office manager': ['Office Management', 'Administrative Support', 'Vendor Management', 'Budget Tracking', 'Team Leadership', 'Process Improvement', 'Facility Management'],
  
  // Healthcare Roles
  'medical assistant': ['Patient Care', 'Medical Terminology', 'Clinical Documentation', 'Electronic Health Records', 'Patient Scheduling', 'Vital Signs', 'Medical Billing'],
  'nurse': ['Patient Care', 'Clinical Documentation', 'Electronic Health Records', 'Patient Assessment', 'Medication Administration', 'Patient Education', 'Care Planning'],
  'pharmacy technician': ['Pharmacy Operations', 'Medication Dispensing', 'Inventory Management', 'Customer Service', 'Prescription Processing', 'Drug Interactions', 'Regulatory Compliance'],
  
  // Education Roles
  'teacher': ['Curriculum Development', 'Lesson Planning', 'Classroom Management', 'Student Assessment', 'Differentiated Instruction', 'Parent Communication', 'Educational Technology'],
  'tutor': ['Academic Support', 'Student Assessment', 'Lesson Planning', 'Differentiated Instruction', 'Subject Matter Expertise', 'Patience', 'Communication Skills'],
  'educational consultant': ['Educational Consulting', 'Curriculum Development', 'Professional Development', 'Educational Technology', 'Assessment Design', 'Strategic Planning'],
  
  // Finance Roles
  'accountant': ['Financial Analysis', 'General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Tax Preparation', 'QuickBooks', 'Excel', 'Financial Reporting'],
  'financial analyst': ['Financial Analysis', 'Financial Modeling', 'Excel', 'Budgeting', 'Forecasting', 'Data Analysis', 'Financial Reporting', 'Investment Analysis'],
  'bookkeeper': ['Bookkeeping', 'General Ledger', 'Accounts Payable', 'Accounts Receivable', 'QuickBooks', 'Excel', 'Financial Records', 'Reconciliation'],
  
  // Design Roles
  'graphic designer': ['Graphic Design', 'Adobe Creative Suite', 'Typography', 'Color Theory', 'Layout Design', 'Brand Identity', 'Logo Design', 'Digital Design'],
  'ui/ux designer': ['UI/UX Design', 'Figma', 'Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Information Architecture', 'Interaction Design'],
  'web designer': ['Web Design', 'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Git', 'REST APIs', 'Responsive Design', 'Web Development'],
  
  // Technology Roles
  'software developer': ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Git', 'REST APIs', 'Database Design', 'Problem Solving'],
  'web developer': ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Git', 'REST APIs', 'Responsive Design', 'Web Development'],
  'data analyst': ['Data Analysis', 'SQL', 'Python', 'Excel', 'Tableau', 'Power BI', 'Statistical Analysis', 'Data Visualization'],
  
  // Marketing Roles
  'marketing specialist': ['Digital Marketing', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'SEO', 'Google Analytics', 'Campaign Management', 'Marketing Strategy'],
  'social media manager': ['Social Media Marketing', 'Content Creation', 'Community Management', 'Analytics', 'Campaign Management', 'Brand Management', 'Social Media Strategy'],
  'content writer': ['Content Writing', 'Copywriting', 'SEO', 'Content Strategy', 'Research', 'Editing', 'Digital Marketing', 'Blog Writing'],
  
  // Legal Roles
  'paralegal': ['Legal Research', 'Case Law', 'Document Review', 'Legal Writing', 'Court Filings', 'Case Management', 'Legal Technology', 'Client Relations'],
  'legal assistant': ['Legal Support', 'Document Management', 'Legal Research', 'Court Filings', 'Client Relations', 'Legal Technology', 'Administrative Support'],
  
  // Science Roles
  'research assistant': ['Research Design', 'Data Collection', 'Statistical Analysis', 'Laboratory Techniques', 'Scientific Writing', 'Literature Review', 'Data Analysis'],
  'laboratory technician': ['Laboratory Techniques', 'Equipment Operation', 'Sample Preparation', 'Quality Control', 'Safety Protocols', 'Data Collection', 'Analytical Chemistry'],
  
  // Media Roles
  'journalist': ['Journalism', 'News Writing', 'Research', 'Interviewing', 'Fact-checking', 'Editing', 'Digital Media', 'Social Media'],
  'content creator': ['Content Creation', 'Video Production', 'Photography', 'Social Media', 'Content Strategy', 'Editing', 'Digital Marketing', 'Brand Collaboration'],
  
  // Service Industry Roles
  'restaurant manager': ['Restaurant Management', 'Food Service', 'Staff Management', 'Customer Service', 'Inventory Management', 'Food Safety', 'Financial Management'],
  'hotel manager': ['Hotel Operations', 'Hospitality Management', 'Guest Relations', 'Staff Management', 'Revenue Management', 'Customer Service', 'Operations Management'],
  
  // Trades Roles
  'electrician': ['Electrical Work', 'Troubleshooting', 'Installation', 'Safety Protocols', 'Blueprint Reading', 'Equipment Maintenance', 'Code Compliance'],
  'plumber': ['Plumbing', 'Installation', 'Repair', 'Troubleshooting', 'Safety Protocols', 'Equipment Maintenance', 'Code Compliance'],
  'carpenter': ['Carpentry', 'Construction', 'Blueprint Reading', 'Installation', 'Repair', 'Safety Protocols', 'Equipment Operation']
};

// Get skills based on job role
export function getSkillsByRole(role: string): string[] {
  const normalizedRole = role.toLowerCase().trim();
  
  // Check exact matches first
  if (JOB_ROLE_SKILLS[normalizedRole]) {
    return JOB_ROLE_SKILLS[normalizedRole];
  }
  
  // Check partial matches
  for (const [jobRole, skills] of Object.entries(JOB_ROLE_SKILLS)) {
    if (normalizedRole.includes(jobRole) || jobRole.includes(normalizedRole)) {
      return skills;
    }
  }
  
  // Return popular skills if no match found
  return getPopularSkills();
}

// Get all skills
export function getAllSkills(): string[] {
  return SKILL_CATEGORIES.flatMap(category => category.skills);
}

// Get skills by category
export function getSkillsByCategory(categoryName: string): string[] {
  const category = SKILL_CATEGORIES.find(cat => 
    cat.name.toLowerCase().includes(categoryName.toLowerCase()) ||
    categoryName.toLowerCase().includes(cat.name.toLowerCase())
  );
  return category ? category.skills : [];
}

// Search skills
export function searchSkills(query: string): string[] {
  const normalizedQuery = query.toLowerCase();
  return getAllSkills().filter(skill => 
    skill.toLowerCase().includes(normalizedQuery)
  );
}

// Get popular skills (most commonly used across industries)
export function getPopularSkills(): string[] {
  return [
    'Communication Skills', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management',
    'Microsoft Office', 'Excel', 'Word', 'PowerPoint', 'Customer Service', 'Project Management',
    'Data Analysis', 'Research', 'Writing', 'Editing', 'Presentation Skills', 'Negotiation',
    'Sales', 'Marketing', 'Social Media', 'Digital Marketing', 'Content Creation', 'Graphic Design',
    'Critical Thinking', 'Adaptability', 'Creativity', 'Attention to Detail', 'Organization',
    'Planning', 'Coordination', 'Training', 'Mentoring', 'Quality Assurance', 'Process Improvement',
    'Budget Management', 'Strategic Planning', 'Client Relations', 'Vendor Management', 'Compliance'
  ];
} 