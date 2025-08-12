'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Eye, 
  Plus, 
  Trash2, 
  Save, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { ResumeData, PersonalInfo, Experience, Education } from '@/types/resume';
import { downloadPDF, validateResumeData, getResumePreviewData } from '@/lib/pdf-utils';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';
import { SkillsInput } from './skills-input';
import { TemplateSelector } from './template-selector';
import { AISuggestions } from './ai-suggestions';
import { StepProgress } from './step-progress';
import { PhotoUpload } from './photo-upload';

type Step = 'template' | 'content' | 'suggestions';

export function ResumeBuilder({ initialTemplate = 'modern' }: { initialTemplate?: string }) {
  const [resumeData, setResumeData] = useState<ResumeData>(getResumePreviewData());
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [currentStep, setCurrentStep] = useState<Step>('template');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const steps = [
    { id: 'template', title: 'Choose Template', description: 'Select a professional template' },
    { id: 'content', title: 'Resume Content', description: 'Fill in your information' },
    { id: 'suggestions', title: 'AI Suggestions', description: 'Get intelligent recommendations' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

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

  const addExperience = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: [''],
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), newExperience],
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
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

  const updateResume = (updates: Partial<ResumeData>) => {
    setResumeData(prev => ({
      ...prev,
      ...updates,
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

  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === selectedTemplate);

  const handleGeneratePDF = async () => {
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      const validation = validateResumeData(resumeData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return;
      }

      await downloadPDF(resumeData, selectedTemplate);
      setSuccess(true);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to generate PDF']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Resume Builder</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Create a professional resume with beautiful templates
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => setResumeData(getResumePreviewData())}
            className="w-full sm:w-auto"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            onClick={handleGeneratePDF} 
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Generate PDF
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <StepProgress 
            steps={steps} 
            currentStep={currentStep} 
            onStepClick={(stepId) => setCurrentStep(stepId as Step)}
          />
        </CardContent>
      </Card>

      {/* Alerts */}
      {errors.length > 0 && (
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
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Resume generated successfully! A new window should open with your resume. Use the print button or Ctrl+P (Cmd+P on Mac) to save as PDF.
          </AlertDescription>
        </Alert>
      )}

      {/* Step Content */}
      {currentStep === 'template' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Choose Your Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateSelect={() => {}} // No longer needed since we navigate directly
              onPreview={(template) => setSelectedTemplate(template)}
              resumeData={resumeData}
            />
            <div className="flex justify-end">
              <Button onClick={nextStep} className="min-w-[120px]">
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 'content' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Resume Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5 gap-1">
                <TabsTrigger value="personal" className="text-xs md:text-sm">Personal Info</TabsTrigger>
                <TabsTrigger value="summary" className="text-xs md:text-sm">Summary</TabsTrigger>
                <TabsTrigger value="experience" className="text-xs md:text-sm">Experience</TabsTrigger>
                <TabsTrigger value="education" className="text-xs md:text-sm">Education</TabsTrigger>
                <TabsTrigger value="skills" className="text-xs md:text-sm">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="space-y-4">
                  {/* Photo Upload - Only show if template supports it */}
                  {currentTemplateData?.hasPhoto && (
                    <PhotoUpload
                      photo={resumeData.personalInfo.photo || null}
                      onPhotoChange={updatePhoto}
                      name={resumeData.personalInfo.name}
                      photoAdjustments={resumeData.personalInfo.photoAdjustments}
                    />
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input
                        id="title"
                        value={resumeData.personalInfo.title}
                        onChange={(e) => updatePersonalInfo('title', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location || ''}
                          onChange={(e) => updatePersonalInfo('location', e.target.value)}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin || ''}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="summary" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={resumeData.summary || ''}
                    onChange={(e) => updateSummary(e.target.value)}
                    placeholder="Write a compelling professional summary..."
                    rows={6}
                  />
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Work Experience</h3>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                  
                  {resumeData.experience?.map((exp, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Experience {index + 1}</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeExperience(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                placeholder="Company Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Position</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                placeholder="Job Title"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                placeholder="2020"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                placeholder="Present"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={Array.isArray(exp.description) ? exp.description.join('\n') : exp.description}
                              onChange={(e) => updateExperience(index, 'description', e.target.value.split('\n').filter(line => line.trim() !== ''))}
                              placeholder="Describe your responsibilities and achievements... (one per line)"
                              rows={3}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Education</h3>
                    <Button onClick={addEducation} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                  
                  {resumeData.education?.map((edu, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Education {index + 1}</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeEducation(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>School/University</Label>
                              <Input
                                value={edu.school}
                                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                placeholder="University Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                placeholder="Bachelor's Degree"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Field of Study</Label>
                              <Input
                                value={edu.field}
                                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                placeholder="Computer Science"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Graduation Year</Label>
                              <Input
                                value={edu.graduationYear}
                                onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                                placeholder="2020"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <div className="space-y-2">
                  <Label>Skills & Competencies</Label>
                  <SkillsInput
                    skills={resumeData.skills || []}
                    onSkillsChange={updateSkills}
                    jobRole={resumeData.personalInfo.title}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end pt-4">
              <Button onClick={nextStep} className="min-w-[120px]">
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 'suggestions' && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AISuggestions
              resumeData={resumeData}
              onUpdateResume={updateResume}
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleGeneratePDF} 
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Generate PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {currentStep !== 'suggestions' && (
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
      )}
    </div>
  );
} 