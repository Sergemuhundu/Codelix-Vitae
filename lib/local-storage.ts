import { ResumeData } from '@/types/resume';

const RESUME_DATA_KEY = 'cvadapter_resume_data';
const TEMPLATE_KEY = 'cvadapter_selected_template';

export interface LocalResumeData {
  resumeData: ResumeData;
  selectedTemplate: string;
  lastModified: number;
}

export const localStorageUtils = {
  // Save resume data to local storage
  saveResumeData: (resumeData: ResumeData, selectedTemplate: string): void => {
    try {
      const data: LocalResumeData = {
        resumeData,
        selectedTemplate,
        lastModified: Date.now(),
      };
      localStorage.setItem(RESUME_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save resume data to local storage:', error);
    }
  },

  // Load resume data from local storage
  loadResumeData: (): LocalResumeData | null => {
    try {
      const data = localStorage.getItem(RESUME_DATA_KEY);
      if (!data) return null;
      
      const parsed = JSON.parse(data) as LocalResumeData;
      
      // Validate the data structure
      if (!parsed.resumeData || !parsed.selectedTemplate) {
        return null;
      }
      
      return parsed;
    } catch (error) {
      console.error('Failed to load resume data from local storage:', error);
      return null;
    }
  },

  // Clear resume data from local storage
  clearResumeData: (): void => {
    try {
      localStorage.removeItem(RESUME_DATA_KEY);
    } catch (error) {
      console.error('Failed to clear resume data from local storage:', error);
    }
  },

  // Check if there's saved data
  hasSavedData: (): boolean => {
    try {
      return localStorage.getItem(RESUME_DATA_KEY) !== null;
    } catch (error) {
      return false;
    }
  },

  // Get last modified timestamp
  getLastModified: (): number | null => {
    try {
      const data = localStorage.getItem(RESUME_DATA_KEY);
      if (!data) return null;
      
      const parsed = JSON.parse(data) as LocalResumeData;
      return parsed.lastModified || null;
    } catch (error) {
      return null;
    }
  },

  // Auto-save data periodically
  autoSave: (resumeData: ResumeData, selectedTemplate: string): void => {
    // Only auto-save if there are significant changes (not empty data)
    const hasContent = 
      resumeData.personalInfo.name ||
      resumeData.personalInfo.title ||
      resumeData.personalInfo.email ||
      resumeData.summary ||
      (resumeData.experience && resumeData.experience.length > 0) ||
      (resumeData.education && resumeData.education.length > 0) ||
      (resumeData.skills && resumeData.skills.length > 0);

    if (hasContent) {
      localStorageUtils.saveResumeData(resumeData, selectedTemplate);
    }
  },
}; 