export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'minimal' | 'professional' | 'sidebar' | 'premium' | 'executive' | 'creative' | 'tech' | 'academic';
  isPremium: boolean;
  preview: string;
  features: string[];
  hasPhoto: boolean;
}

export const AVAILABLE_TEMPLATES: ResumeTemplate[] = [
  // Free Templates (contain "simple" in name)
  {
    id: 'blue-simple',
    name: 'Blue Simple Professional',
    description: '',
    category: 'professional',
    isPremium: false,
    preview: '/templates/blue_simple_professional_cv_resume.png',
    features: ['Professional', 'Clean', 'ATS-Friendly'],
    hasPhoto: true
  },
  {
    id: 'neutral-simple',
    name: 'Neutral Simple Elegant',
    description: '',
    category: 'minimal',
    isPremium: false,
    preview: '/templates/neutral_simple_elegant_clean_classic_pinimalist_professional_photo_cv_resume_a4_ocument.png',
    features: ['Minimal', 'Elegant', 'Classic'],
    hasPhoto: true
  },
  {
    id: 'simple-professional',
    name: 'Simple Professional',
    description: '',
    category: 'professional',
    isPremium: false,
    preview: '/templates/simple_professional_cv_resume.png',
    features: ['Professional', 'Simple', 'Clean'],
    hasPhoto: false
  },
  {
    id: 'white-simple-sales',
    name: 'White Simple Sales',
    description: '',
    category: 'professional',
    isPremium: false,
    preview: '/templates/white_simple_rales_representative_cv_resume.png',
    features: ['Sales', 'Simple', 'Professional'],
    hasPhoto: false
  },
  {
    id: 'white-simple-web',
    name: 'White Simple Web Developer',
    description: '',
    category: 'tech',
    isPremium: false,
    preview: '/templates/white_simple_Web_developer_resume.png',
    features: ['Web Developer', 'Tech', 'Simple'],
    hasPhoto: false
  },
  {
    id: 'blue-gray-simple',
    name: 'Blue & Gray Simple',
    description: '',
    category: 'professional',
    isPremium: false,
    preview: '/templates/blue_and_gray_simple_professional_cv_resume.png',
    features: ['Professional', 'Two-tone', 'Simple'],
    hasPhoto: false
  },
  {
    id: 'systems-design-simple',
    name: 'Systems Design Simple',
    description: '',
    category: 'tech',
    isPremium: false,
    preview: '/templates/systems_design_resume_in-white-black-simple_style.png',
    features: ['Systems Design', 'Tech', 'Simple'],
    hasPhoto: false
  },

  // Premium Templates (no "simple" in name)
  {
    id: 'beige-minimalist-corporate',
    name: 'Beige Minimalist Corporate',
    description: '',
    category: 'executive',
    isPremium: true,
    preview: '/templates/beige_minimalist_corporate_it_project_manager_resume.png',
    features: ['Corporate', 'Minimalist', 'Executive'],
    hasPhoto: true
  },
  {
    id: 'beige-minimalist-corporate-1',
    name: 'Beige Corporate IT Manager',
    description: '',
    category: 'executive',
    isPremium: true,
    preview: '/templates/beige_minimalist_corporate_it_project_manager_resume_1.png',
    features: ['IT Manager', 'Corporate', 'Executive'],
    hasPhoto: true
  },
  {
    id: 'black-and-white-corporate',
    name: 'Black & White Corporate',
    description: '',
    category: 'executive',
    isPremium: true,
    preview: '/templates/black_and_white_corporate_resume.png',
    features: ['Corporate', 'Executive', 'Professional'],
    hasPhoto: true
  },
  {
    id: 'black-modern-professional',
    name: 'Black Modern Professional',
    description: '',
    category: 'modern',
    isPremium: true,
    preview: '/templates/black_modern_professional_resume.png',
    features: ['Modern', 'Professional', 'Bold'],
    hasPhoto: false
  },
  {
    id: 'black-white-minimalist-accountant',
    name: 'Black & White Accountant',
    description: '',
    category: 'professional',
    isPremium: true,
    preview: '/templates/black_white_minimalist_accountant_resume.png',
    features: ['Accountant', 'Minimalist', 'Professional'],
    hasPhoto: true
  },
  {
    id: 'black-white-minimalist',
    name: 'Black & White Minimalist',
    description: '',
    category: 'minimal',
    isPremium: true,
    preview: '/templates/black_white_minimalist_cv_resume.png',
    features: ['Minimalist', 'Clean', 'Modern'],
    hasPhoto: true
  },
  {
    id: 'brown-beige-minimalist',
    name: 'Brown & Beige Minimalist',
    description: '',
    category: 'minimal',
    isPremium: true,
    preview: '/templates/brown_beige_minimalist_cv_resume.png',
    features: ['Minimalist', 'Warm', 'Elegant'],
    hasPhoto: true
  },
  {
    id: 'dark-blue-white-education',
    name: 'Dark Blue & White Education',
    description: '',
    category: 'academic',
    isPremium: true,
    preview: '/templates/dark_blue_and_white-minimalist_education_resume.png',
    features: ['Education', 'Academic', 'Professional'],
    hasPhoto: true
  },
  {
    id: 'green-white-graphic-designer',
    name: 'Green & White Graphic Designer',
    description: '',
    category: 'creative',
    isPremium: true,
    preview: '/templates/green_and_white_modern_graphic_designer_esume.png',
    features: ['Graphic Designer', 'Creative', 'Modern'],
    hasPhoto: true
  },
  {
    id: 'green-professional-modern',
    name: 'Green Professional Modern',
    description: '',
    category: 'modern',
    isPremium: true,
    preview: '/templates/green_professional modern_cv_resume.png',
    features: ['Professional', 'Modern', 'Green'],
    hasPhoto: false
  },
  {
    id: 'ivory-minimalist-sales',
    name: 'Ivory Minimalist Sales',
    description: '',
    category: 'professional',
    isPremium: true,
    preview: '/templates/ivory_minimalist_sales_manager_resume.png',
    features: ['Sales Manager', 'Minimalist', 'Elegant'],
    hasPhoto: true
  },
  {
    id: 'minimalist-clean-signature',
    name: 'Minimalist Clean Signature',
    description: '',
    category: 'minimal',
    isPremium: true,
    preview: '/templates/Minimalist_clean_signature_cv_resume.png',
    features: ['Minimalist', 'Clean', 'Signature'],
    hasPhoto: true
  },
  {
    id: 'neutral-professional-sales',
    name: 'Neutral Professional Sales',
    description: '',
    category: 'professional',
    isPremium: true,
    preview: '/templates/neutral_professional-sales-representative-resume.png',
    features: ['Sales', 'Professional', 'Neutral'],
    hasPhoto: true
  },
  {
    id: 'pink-minimalist',
    name: 'Pink Minimalist',
    description: '',
    category: 'creative',
    isPremium: true,
    preview: '/templates/pink_minimalist_cv_resume.png',
    features: ['Minimalist', 'Creative', 'Pink'],
    hasPhoto: true
  },
  {
    id: 'professional-modern',
    name: 'Professional Modern',
    description: '',
    category: 'modern',
    isPremium: true,
    preview: '/templates/professional_modern_cv_resume.png',
    features: ['Professional', 'Modern', 'Clean'],
    hasPhoto: false
  },
  {
    id: 'white-minimalist-marketing',
    name: 'White Minimalist Marketing',
    description: '',
    category: 'professional',
    isPremium: true,
    preview: '/templates/white_minimalist_clean_marketing_manager_resume.png',
    features: ['Marketing Manager', 'Minimalist', 'Clean'],
    hasPhoto: true
  }
];

export const getTemplateById = (id: string): ResumeTemplate | undefined => {
  return AVAILABLE_TEMPLATES.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: ResumeTemplate['category']): ResumeTemplate[] => {
  return AVAILABLE_TEMPLATES.filter(template => template.category === category);
};

export const getFreeTemplates = (): ResumeTemplate[] => {
  return AVAILABLE_TEMPLATES.filter(template => !template.isPremium);
};

export const getPremiumTemplates = (): ResumeTemplate[] => {
  return AVAILABLE_TEMPLATES.filter(template => template.isPremium);
};

export const getTemplatesByPlan = (isPremium: boolean): ResumeTemplate[] => {
  return AVAILABLE_TEMPLATES.filter(template => template.isPremium === isPremium);
}; 