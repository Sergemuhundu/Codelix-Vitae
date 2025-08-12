export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string; // Base64 encoded image or URL
  photoAdjustments?: {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
  };
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string[]; // Array of bullet points
  achievements?: string[];
}

export interface Education {
  school: string;
  degree: string;
  field?: string;
  graduationYear: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: string[];
  interests?: string[];
}

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