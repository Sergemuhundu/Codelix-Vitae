'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthState } from '@/hooks/use-auth-state';

import { localStorageUtils } from '@/lib/local-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronLeft, 
  Home, 
  Download, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Plus,
  Trash2,
  ChevronRight,
  Eye,
  Printer,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';
import { ResumeData, PersonalInfo, Experience, Education } from '@/types/resume';
import { downloadPDF, validateResumeData, getResumePreviewData } from '@/lib/pdf-utils';
import { SkillsInput } from '@/components/builder/skills-input';
import { PhotoUpload } from '@/components/builder/photo-upload';
import { ResumePreview } from '@/components/builder/resume-preview';
import { StepProgress } from '@/components/builder/step-progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Step = 'personal' | 'experience' | 'education' | 'skills' | 'languages';

// Debounce hook for input optimization
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ResumeBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summarySuccess, setSummarySuccess] = useState(false);
  const [descriptionLoading, setDescriptionLoading] = useState<number | null>(null);
  const [descriptionSuccess, setDescriptionSuccess] = useState<number | null>(null);
  const [bulletLoading, setBulletLoading] = useState<{expIndex: number, bulletIndex: number} | null>(null);
  const [bulletSuccess, setBulletSuccess] = useState<{expIndex: number, bulletIndex: number} | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  
  // Authentication and local storage management
  const {
    isAuthenticated,
    isLoading: authLoading,
    requireAuth,
    loadLocalData,
    saveLocalData,
    autoSaveLocalData,
    clearLocalData,
    clearLocalDataAfterSave,
    hasLocalData,
  } = useAuthState();
  
  // Initialize resume data state
  const [resumeData, setResumeData] = useState<ResumeData>(getResumePreviewData());

  // Debounced resume data for preview updates
  const debouncedResumeData = useDebounce(resumeData, 300);

  const steps = useMemo(() => [
    { id: 'personal', title: 'Personal Info', description: 'Basic information and summary' },
    { id: 'experience', title: 'Experience', description: 'Work history and achievements' },
    { id: 'education', title: 'Education', description: 'Academic background' },
    { id: 'skills', title: 'Skills', description: 'Competencies and expertise' },
    { id: 'languages', title: 'Languages', description: 'Language proficiencies' }
  ], []);

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  // Get template from URL params and load local data
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam) {
      setSelectedTemplate(templateParam);
    }

    // Load local data if available (regardless of authentication status)
    // This ensures local data is preserved when user logs in
    if (!authLoading) {
      const localData = loadLocalData();
      if (localData) {
        setResumeData(localData.resumeData);
        setSelectedTemplate(localData.selectedTemplate);
      }
    }
  }, [searchParams, authLoading, loadLocalData]);

  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === selectedTemplate);

  const nextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as Step);
    }
  }, [currentStepIndex, steps]);

  const prevStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as Step);
    }
  }, [currentStepIndex, steps]);
  
  const updatePersonalInfo = useCallback((field: keyof PersonalInfo, value: string) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  }, [errors.length]);

  const updateSummary = useCallback((value: string) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      summary: value,
    }));
  }, [errors.length]);

  const updatePhoto = useCallback((photo: string | null, adjustments?: {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
  }) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        photo: photo || undefined,
        photoAdjustments: adjustments || prev.personalInfo.photoAdjustments,
      },
    }));
  }, []);

  const addExperience = useCallback(() => {
    // Clear errors when user adds experience
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: [''],
        },
      ],
    }));
  }, [errors.length]);

  const updateExperience = useCallback((index: number, field: keyof Experience, value: string) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  }, [errors.length]);

  const updateExperienceDescription = useCallback((index: number, description: string[]) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map((exp, i) =>
        i === index ? { ...exp, description } : exp
      ),
    }));
  }, [errors.length]);

  const updateBulletPoint = useCallback((expIndex: number, bulletIndex: number, value: string) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map((exp, i) =>
        i === expIndex ? {
          ...exp,
          description: exp.description.map((bullet, j) => j === bulletIndex ? value : bullet)
        } : exp
      ),
    }));
  }, [errors.length]);

  const addBulletPoint = useCallback((expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map((exp, i) =>
        i === expIndex ? {
          ...exp,
          description: [...exp.description, '']
        } : exp
      ),
    }));
  }, []);

  const removeBulletPoint = useCallback((expIndex: number, bulletIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).map((exp, i) =>
        i === expIndex ? {
          ...exp,
          description: exp.description.filter((_, j) => j !== bulletIndex)
        } : exp
      ),
    }));
  }, []);

  const removeExperience = useCallback((index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: (prev.experience || []).filter((_, i) => i !== index),
    }));
  }, []);

  const addEducation = useCallback(() => {
    // Clear errors when user adds education
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          school: '',
          degree: '',
          field: '',
          graduationYear: '',
          gpa: '',
        },
      ],
    }));
  }, [errors.length]);

  const updateEducation = useCallback((index: number, field: keyof Education, value: string) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      education: (prev.education || []).map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  }, [errors.length]);

  const removeEducation = useCallback((index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index),
    }));
  }, []);

  const updateSkills = useCallback((skills: string[]) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      skills,
    }));
  }, [errors.length]);

  const updateLanguages = useCallback((languages: string[]) => {
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    setResumeData(prev => ({
      ...prev,
      languages,
    }));
  }, [errors.length]);

  // Auto-save data when it changes (for non-authenticated users or authenticated users with local data)
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || hasLocalData())) {
      autoSaveLocalData(resumeData, selectedTemplate);
    }
  }, [resumeData, selectedTemplate, authLoading, isAuthenticated, autoSaveLocalData, hasLocalData]);

  const handleGeneratePDF = async () => {
    if (!requireAuth('generate PDF', () => {})) {
      return;
    }
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      // Validate the resume data first
      const validation = validateResumeData(resumeData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      // Use the new downloadPDF function
      await downloadPDF(resumeData, selectedTemplate);
      setSuccess(true);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to generate resume']);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!requireAuth('download PDF', () => {})) {
      return;
    }
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      // Validate the resume data first
      const validation = validateResumeData(resumeData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      // Use the new downloadPDF function
      await downloadPDF(resumeData, selectedTemplate);
      setSuccess(true);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to download resume']);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintResume = async () => {
    if (!requireAuth('print resume', () => {})) {
      return;
    }
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      // Validate the resume data first
      const validation = validateResumeData(resumeData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      // Generate HTML and open in new window for printing
      const { generateHTML } = await import('@/lib/html-generator');
      const html = generateHTML(resumeData, selectedTemplate);
      
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.print();
        };
      }
      
      setSuccess(true);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to print resume']);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTemplates = () => {
    router.push('/templates');
  };

  const handleGoToDashboard = () => {
    router.push('/');
  };

  // Local data handlers
  const handleLoadLocalData = () => {
    const localData = loadLocalData();
    if (localData) {
      setResumeData(localData.resumeData);
      setSelectedTemplate(localData.selectedTemplate);
    }
  };

  const handleClearLocalData = () => {
    clearLocalData();
    setResumeData(getResumePreviewData());
  };

  const handleSaveToAccount = async () => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      // Save resume data to authenticated user's account
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          template: selectedTemplate,
          name: resumeData.personalInfo.name || 'My Resume',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume to account');
      }

      // Clear local data after successful save
      clearLocalDataAfterSave();
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to save resume to account']);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!requireAuth('generate summary', () => {})) {
      return;
    }

    setSummaryLoading(true);
    setErrors([]);

    try {
      // Prepare data for AI summary generation
      const experienceText = resumeData.experience?.map(exp => 
        `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`
      ).join('. ') || '';

      const skillsText = resumeData.skills?.join(', ') || '';
      const jobTitle = resumeData.personalInfo.title || 'Professional';

      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'summaries',
          data: {
            jobTitle,
            experience: experienceText,
            skills: skillsText.split(', '),
            currentSummary: resumeData.summary
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const suggestions = await response.json();
      
      if (suggestions && suggestions.length > 0) {
        // Use the first suggestion as the new summary
        updateSummary(suggestions[0].content);
        setSummarySuccess(true);
        // Clear success message after 3 seconds
        setTimeout(() => setSummarySuccess(false), 3000);
      }
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to generate summary']);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleGenerateDescription = async (index: number) => {
    if (!requireAuth('generate description', () => {})) {
      return;
    }

    const exp = resumeData.experience?.[index];
    if (!exp) return;

    setDescriptionLoading(index);
    setErrors([]);

    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'descriptions',
          data: {
            position: exp.position,
            company: exp.company,
            startDate: exp.startDate,
            endDate: exp.endDate,
            currentDescription: exp.description.join('\n'),
            skills: resumeData.skills || [],
            jobTitle: resumeData.personalInfo.title || 'Professional'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate description');
      }

      const suggestions = await response.json();
      
      if (suggestions && suggestions.length > 0 && suggestions[0] && suggestions[0].content) {
        let bulletPoints: string[];
        
        if (Array.isArray(suggestions[0].content)) {
          // Content is already an array of bullet points
          bulletPoints = suggestions[0].content.map((bullet: string) => bullet.replace(/^[•\-\*]\s*/, '').trim());
        } else if (typeof suggestions[0].content === 'string') {
          // Content is a string that needs to be split
          bulletPoints = suggestions[0].content.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^[•\-\*]\s*/, '').trim());
        } else {
          console.error('Invalid content format:', suggestions[0].content);
          throw new Error('Invalid content format from AI service');
        }
        
        updateExperienceDescription(index, bulletPoints);
        setDescriptionSuccess(index);
        // Clear success message after 3 seconds
        setTimeout(() => setDescriptionSuccess(null), 3000);
      } else {
        console.error('Invalid suggestions response:', suggestions);
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to generate description']);
    } finally {
      setDescriptionLoading(null);
    }
  };

  const handleGenerateBulletPoint = async (expIndex: number, bulletIndex: number) => {
    if (!requireAuth('generate bullet point', () => {})) {
      return;
    }

    const exp = resumeData.experience?.[expIndex];
    if (!exp) return;

    setBulletLoading({ expIndex, bulletIndex });
    setErrors([]);

    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'descriptions',
          data: {
            position: exp.position,
            company: exp.company,
            startDate: exp.startDate,
            endDate: exp.endDate,
            currentDescription: exp.description.join('\n'),
            skills: resumeData.skills || [],
            jobTitle: resumeData.personalInfo.title || 'Professional'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate bullet point');
      }

      const suggestions = await response.json();
      
      if (suggestions && suggestions.length > 0 && suggestions[0] && suggestions[0].content) {
        let bulletPoints: string[];
        
        if (Array.isArray(suggestions[0].content)) {
          // Content is already an array of bullet points
          bulletPoints = suggestions[0].content.map((bullet: string) => bullet.replace(/^[•\-\*]\s*/, '').trim());
        } else if (typeof suggestions[0].content === 'string') {
          // Content is a string that needs to be split
          bulletPoints = suggestions[0].content.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^[•\-\*]\s*/, '').trim());
        } else {
          console.error('Invalid content format:', suggestions[0].content);
          throw new Error('Invalid content format from AI service');
        }
        
        if (bulletPoints.length > 0) {
          updateBulletPoint(expIndex, bulletIndex, bulletPoints[0]);
          setBulletSuccess({ expIndex, bulletIndex });
          // Clear success message after 3 seconds
          setTimeout(() => setBulletSuccess(null), 3000);
        } else {
          throw new Error('No valid bullet points generated');
        }
      } else {
        console.error('Invalid suggestions response:', suggestions);
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to generate bullet point']);
    } finally {
      setBulletLoading(null);
    }
  };

  return (
    <div className="resume-builder-page bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToTemplates}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Templates
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoToDashboard}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </div>
          
                     <div className="flex items-center space-x-4">
             <div className="text-sm text-gray-600">
               Template: <span className="font-medium">{currentTemplateData?.name}</span>
             </div>
             
             {/* Save to Account button for authenticated users with local data */}
             {isAuthenticated && hasLocalData() && (
               <Button
                 variant="outline"
                 onClick={handleSaveToAccount}
                 disabled={loading}
                 className="flex items-center gap-2"
               >
                 {loading ? (
                   <Loader2 className="h-4 w-4 animate-spin" />
                 ) : (
                   <>
                     <CheckCircle className="h-4 w-4" />
                     Save to Account
                   </>
                 )}
               </Button>
             )}
             
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Export Resume
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrintResume}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

             {/* Alerts */}
       {errors.length > 0 && (
         <div className="px-4 py-4 flex-shrink-0">
           <Alert variant="destructive">
             <AlertCircle className="h-4 w-4" />
             <AlertDescription>
               <ul className="list-disc list-inside">
                 {errors.map((error, index) => (
                   <li key={index}>{error}</li>
                 ))}
               </ul>
             </AlertDescription>
           </Alert>
         </div>
       )}

               {summarySuccess && (
          <div className="px-4 py-4 flex-shrink-0">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Summary generated successfully!
              </AlertDescription>
            </Alert>
          </div>
        )}

                 {saveSuccess && (
           <div className="px-4 py-4 flex-shrink-0">
             <Alert>
               <CheckCircle className="h-4 w-4" />
               <AlertDescription>
                 Resume saved to your account successfully! You can now access it from your dashboard.
               </AlertDescription>
             </Alert>
           </div>
         )}

         {success && (
           <div className="px-4 py-4 flex-shrink-0">
             <Alert>
               <CheckCircle className="h-4 w-4" />
               <AlertDescription>
                 Resume exported successfully! Check your downloads or print dialog.
               </AlertDescription>
             </Alert>
           </div>
         )}



      {/* Main Content */}
      <div className="resume-builder-content">
        <div className="w-full px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Form */}
            <div className="space-y-6">
              {currentStep === 'personal' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Info</CardTitle>
                    {/* Step Progress Bar */}
                    <div className="pt-4">
                      <StepProgress 
                        steps={steps} 
                        currentStep={currentStep} 
                        onStepClick={(stepId) => setCurrentStep(stepId as Step)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Personal Information Step */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={resumeData.personalInfo.name}
                            onChange={(e) => updatePersonalInfo('name', e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Professional Title</Label>
                                                     <Input
                             id="title"
                             value={resumeData.personalInfo.title}
                             onChange={(e) => updatePersonalInfo('title', e.target.value)}
                             placeholder="e.g., Marketing Manager, Nurse, Teacher, Sales Representative"
                           />
                        </div>
                      </div>
                      
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                           <Label htmlFor="email">Email</Label>
                           <Input
                             id="email"
                             type="email"
                             value={resumeData.personalInfo.email}
                             onChange={(e) => updatePersonalInfo('email', e.target.value)}
                             placeholder="john.doe@example.com"
                           />
                         </div>
                         <div>
                           <Label htmlFor="phone">Phone</Label>
                           <Input
                             id="phone"
                             value={resumeData.personalInfo.phone}
                             onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                             placeholder="+1 (555) 123-4567"
                           />
                         </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                           <Label htmlFor="location">Location</Label>
                           <Input
                             id="location"
                             value={resumeData.personalInfo.location}
                             onChange={(e) => updatePersonalInfo('location', e.target.value)}
                             placeholder="e.g., New York, NY or Remote"
                           />
                         </div>
                         <div>
                           <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                           <Input
                             id="linkedin"
                             value={resumeData.personalInfo.linkedin}
                             onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                             placeholder="linkedin.com/in/yourprofile (optional)"
                           />
                         </div>
                       </div>

                      {currentTemplateData?.hasPhoto && (
                        <div>
                          <Label>Profile Photo (Optional)</Label>
                          <PhotoUpload
                            photo={resumeData.personalInfo.photo || null}
                            onPhotoChange={updatePhoto}
                          />
                        </div>
                      )}

                                             <div>
                         <div className="flex items-center justify-between mb-2">
                           <Label htmlFor="summary">Professional Summary</Label>
                           <Button
                             type="button"
                             variant="outline"
                             size="sm"
                             onClick={handleGenerateSummary}
                             disabled={summaryLoading}
                             className="flex items-center gap-2"
                           >
                             {summaryLoading ? (
                               <Loader2 className="h-4 w-4 animate-spin" />
                             ) : (
                               <Sparkles className="h-4 w-4" />
                             )}
                             Generate Summary
                           </Button>
                         </div>
                                                    <Textarea
                             id="summary"
                             value={resumeData.summary}
                             onChange={(e) => updateSummary(e.target.value)}
                             placeholder="Write a compelling summary highlighting your key qualifications, relevant experience, and career goals. Focus on what makes you unique and valuable to potential employers."
                             rows={6}
                           />
                                              </div>
                     </div>
                     
                     {/* Navigation buttons */}
                     <div className="flex items-center justify-between pt-6 border-t">
                       <Button
                         variant="outline"
                         onClick={() => currentStepIndex > 0 && setCurrentStep(steps[currentStepIndex - 1].id as Step)}
                         disabled={currentStepIndex === 0}
                       >
                         ← Previous
                       </Button>
                       <Button
                         onClick={() => currentStepIndex < steps.length - 1 && setCurrentStep(steps[currentStepIndex + 1].id as Step)}
                         disabled={currentStepIndex === steps.length - 1}
                       >
                         Next →
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
              )}

              {currentStep === 'experience' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                    {/* Step Progress Bar */}
                    <div className="pt-4">
                      <StepProgress 
                        steps={steps} 
                        currentStep={currentStep} 
                        onStepClick={(stepId) => setCurrentStep(stepId as Step)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Experience Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Work Experience</h4>
                        <Button onClick={addExperience} variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      
                      {resumeData.experience?.map((exp, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h5 className="font-medium">Experience {index + 1}</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeExperience(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Company</Label>
                                                             <Input
                                 value={exp.company}
                                 onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                 placeholder="e.g., ABC Corporation, Hospital, School District"
                               />
                            </div>
                            <div>
                              <Label>Position</Label>
                                                             <Input
                                 value={exp.position}
                                 onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                 placeholder="e.g., Manager, Specialist, Coordinator, Assistant"
                               />
                            </div>
                          </div>
                          
                                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <Label>Start Date</Label>
                               <Input
                                 type="month"
                                 value={exp.startDate}
                                 onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                 placeholder="2020-01"
                               />
                             </div>
                                                           <div>
                                <Label>End Date</Label>
                                <div className="space-y-2">
                                  <Input
                                    type="month"
                                    value={exp.endDate === 'Present' ? '' : exp.endDate}
                                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                    placeholder="2023-12"
                                    disabled={exp.endDate === 'Present'}
                                  />
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`present-${index}`}
                                      checked={exp.endDate === 'Present'}
                                      onCheckedChange={(checked) => updateExperience(index, 'endDate', checked ? 'Present' : '')}
                                    />
                                    <Label htmlFor={`present-${index}`} className="text-sm">Present</Label>
                                  </div>
                                </div>
                              </div>
                           </div>
                          
                                                     <div>
                             <div className="flex items-center justify-between mb-2">
                               <Label>Description Bullets</Label>
                               <div className="flex items-center gap-2">
                                 <Button
                                   type="button"
                                   variant="outline"
                                   size="sm"
                                   onClick={() => addBulletPoint(index)}
                                   className="flex items-center gap-2"
                                 >
                                   <Plus className="h-4 w-4" />
                                   Add Bullet
                                 </Button>
                                 <Button
                                   type="button"
                                   variant="outline"
                                   size="sm"
                                   onClick={() => handleGenerateDescription(index)}
                                   disabled={descriptionLoading === index}
                                   className="flex items-center gap-2"
                                 >
                                   {descriptionLoading === index ? (
                                     <Loader2 className="h-4 w-4 animate-spin" />
                                   ) : (
                                     <Sparkles className="h-4 w-4" />
                                   )}
                                   Generate All
                                 </Button>
                               </div>
                             </div>
                             
                             <div className="space-y-2">
                               {exp.description.map((bullet, bulletIndex) => (
                                 <div key={bulletIndex} className="flex items-center gap-2">
                                   <div className="flex-1 flex items-center gap-2">
                                     <span className="text-gray-500 text-sm w-4">•</span>
                                     <Input
                                       value={bullet}
                                       onChange={(e) => updateBulletPoint(index, bulletIndex, e.target.value)}
                                       placeholder="Describe a key responsibility, achievement, or contribution..."
                                       className="flex-1"
                                     />
                                   </div>
                                   <Button
                                     type="button"
                                     variant="outline"
                                     size="sm"
                                     onClick={() => handleGenerateBulletPoint(index, bulletIndex)}
                                     disabled={bulletLoading?.expIndex === index && bulletLoading?.bulletIndex === bulletIndex}
                                     className="flex items-center gap-1"
                                   >
                                     {bulletLoading?.expIndex === index && bulletLoading?.bulletIndex === bulletIndex ? (
                                       <Loader2 className="h-3 w-3 animate-spin" />
                                     ) : (
                                       <Sparkles className="h-3 w-3" />
                                     )}
                                   </Button>
                                   <Button
                                     type="button"
                                     variant="outline"
                                     size="sm"
                                     onClick={() => removeBulletPoint(index, bulletIndex)}
                                     className="text-red-600 hover:text-red-700"
                                     disabled={exp.description.length === 1}
                                   >
                                     <Trash2 className="h-3 w-3" />
                                   </Button>
                                 </div>
                               ))}
                             </div>
                             
                             {descriptionSuccess === index && (
                               <p className="text-sm text-green-600 mt-2">
                                 ✓ All bullets generated successfully!
                               </p>
                             )}
                             
                             {bulletSuccess?.expIndex === index && (
                               <p className="text-sm text-green-600 mt-2">
                                 ✓ Bullet point generated successfully!
                               </p>
                             )}
                           </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => currentStepIndex > 0 && setCurrentStep(steps[currentStepIndex - 1].id as Step)}
                        disabled={currentStepIndex === 0}
                      >
                        ← Previous
                      </Button>
                      <Button
                        onClick={() => currentStepIndex < steps.length - 1 && setCurrentStep(steps[currentStepIndex + 1].id as Step)}
                        disabled={currentStepIndex === steps.length - 1}
                      >
                        Next →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'education' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                    {/* Step Progress Bar */}
                    <div className="pt-4">
                      <StepProgress 
                        steps={steps} 
                        currentStep={currentStep} 
                        onStepClick={(stepId) => setCurrentStep(stepId as Step)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Education Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Education</h4>
                        <Button onClick={addEducation} variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                      
                      {resumeData.education?.map((edu, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h5 className="font-medium">Education {index + 1}</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeEducation(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>School</Label>
                                                             <Input
                                 value={edu.school}
                                 onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                 placeholder="e.g., University Name, College, or Institution"
                               />
                            </div>
                            <div>
                              <Label>Degree</Label>
                                                             <Input
                                 value={edu.degree}
                                 onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                 placeholder="e.g., Bachelor's, Master's, Associate's, Certificate"
                               />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Field of Study</Label>
                                                             <Input
                                 value={edu.field}
                                 onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                 placeholder="e.g., Business, Nursing, Education, Engineering"
                               />
                            </div>
                            <div>
                              <Label>Graduation Year</Label>
                              <Input
                                value={edu.graduationYear}
                                onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                                placeholder="2020"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label>GPA (Optional)</Label>
                            <Input
                              value={edu.gpa}
                              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                              placeholder="3.8"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => currentStepIndex > 0 && setCurrentStep(steps[currentStepIndex - 1].id as Step)}
                        disabled={currentStepIndex === 0}
                      >
                        ← Previous
                      </Button>
                      <Button
                        onClick={() => currentStepIndex < steps.length - 1 && setCurrentStep(steps[currentStepIndex + 1].id as Step)}
                        disabled={currentStepIndex === steps.length - 1}
                      >
                        Next →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'skills' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    {/* Step Progress Bar */}
                    <div className="pt-4">
                      <StepProgress 
                        steps={steps} 
                        currentStep={currentStep} 
                        onStepClick={(stepId) => setCurrentStep(stepId as Step)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Skills Section */}
                    <div className="pt-4">
                                             <Label>Skills & Competencies</Label>
                       <p className="text-sm text-muted-foreground mb-4">
                         Add relevant skills for your industry. Include technical skills, soft skills, certifications, and tools you're proficient with.
                       </p>
                      <SkillsInput
                        skills={resumeData.skills || []}
                        onSkillsChange={updateSkills}
                        jobRole={resumeData.personalInfo.title}
                      />
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => currentStepIndex > 0 && setCurrentStep(steps[currentStepIndex - 1].id as Step)}
                        disabled={currentStepIndex === 0}
                      >
                        ← Previous
                      </Button>
                      <Button
                        onClick={() => currentStepIndex < steps.length - 1 && setCurrentStep(steps[currentStepIndex + 1].id as Step)}
                        disabled={currentStepIndex === steps.length - 1}
                      >
                        Next →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'languages' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                    {/* Step Progress Bar */}
                    <div className="pt-4">
                      <StepProgress 
                        steps={steps} 
                        currentStep={currentStep} 
                        onStepClick={(stepId) => setCurrentStep(stepId as Step)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Languages Section */}
                    <div className="pt-4">
                                             <Label>Language Proficiencies</Label>
                       <p className="text-sm text-muted-foreground mb-4">
                         List languages you speak, read, or write. Include proficiency levels (e.g., Fluent, Conversational, Basic).
                       </p>
                      <SkillsInput
                        skills={resumeData.languages || []}
                        onSkillsChange={updateLanguages}
                        jobRole={resumeData.personalInfo.title}
                      />
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => currentStepIndex > 0 && setCurrentStep(steps[currentStepIndex - 1].id as Step)}
                        disabled={currentStepIndex === 0}
                      >
                        ← Previous
                      </Button>
                      <Button
                        onClick={() => currentStepIndex < steps.length - 1 && setCurrentStep(steps[currentStepIndex + 1].id as Step)}
                        disabled={currentStepIndex === steps.length - 1}
                      >
                        Next →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{currentTemplateData?.name}</Badge>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Eye className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResumePreview data={debouncedResumeData} template={selectedTemplate} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 