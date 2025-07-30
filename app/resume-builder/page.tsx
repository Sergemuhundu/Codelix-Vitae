'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  ChevronDown
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

export default function ResumeBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  
  // Initialize resume data state with sample data
  const [resumeData, setResumeData] = useState<ResumeData>(getResumePreviewData());

  const steps = [
    { id: 'personal', title: 'Personal Info', description: 'Basic information and summary' },
    { id: 'experience', title: 'Experience', description: 'Work history and achievements' },
    { id: 'education', title: 'Education', description: 'Academic background' },
    { id: 'skills', title: 'Skills', description: 'Competencies and expertise' },
    { id: 'languages', title: 'Languages', description: 'Language proficiencies' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  // Get template from URL params
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam) {
      setSelectedTemplate(templateParam);
    }
  }, [searchParams]);

  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === selectedTemplate);

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as Step);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as Step);
    }
  };
  
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateSummary = (value: string) => {
    setResumeData(prev => ({
      ...prev,
      summary: value,
    }));
  };

  const updatePhoto = (photo: string | null, adjustments?: {
    scale: number;
    translateX: number;
    translateY: number;
    rotation: number;
  }) => {
    updatePersonalInfo('photo', photo || '');
    if (adjustments) {
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          photoAdjustments: adjustments,
        },
      }));
    }
  };

  const addExperience = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), newExperience],
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience?.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience?.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      school: '',
      degree: '',
      field: '',
      graduationYear: '',
      gpa: '',
    };
    setResumeData(prev => ({
      ...prev,
      education: [...(prev.education || []), newEducation],
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education?.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index),
    }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: skills,
    }));
  };

  const updateLanguages = (languages: string[]) => {
    setResumeData(prev => ({
      ...prev,
      languages: languages,
    }));
  };

  const handleGeneratePDF = async () => {
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
    router.push('/dashboard/builder');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
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
        <div className="px-4 py-4">
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

      {success && (
        <div className="px-4 py-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Resume exported successfully! Check your downloads or print dialog.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
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
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>
                    
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
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        placeholder="linkedin.com/in/johndoe"
                      />
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
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                        placeholder="Write a compelling summary of your professional background, key achievements, and career objectives..."
                        rows={6}
                      />
                    </div>
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
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                              placeholder="2020-01"
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              placeholder="Present or 2023-12"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
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
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(index, 'field', e.target.value)}
                              placeholder="Computer Science"
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
                    <SkillsInput
                      skills={resumeData.skills || []}
                      onSkillsChange={updateSkills}
                      jobRole={resumeData.personalInfo.title}
                    />
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
                    <SkillsInput
                      skills={resumeData.languages || []}
                      onSkillsChange={updateLanguages}
                      jobRole={resumeData.personalInfo.title}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
              </div>
              
              <Button
                onClick={nextStep}
                disabled={currentStepIndex === steps.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
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
                <ResumePreview data={resumeData} template={selectedTemplate} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 