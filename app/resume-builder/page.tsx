'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Eye, 
  Plus, 
  Trash2, 
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Home,
  Menu
} from 'lucide-react';
import { ResumeData, PersonalInfo, Experience, Education } from '@/types/resume';
import { getResumePreviewData } from '@/lib/pdf-utils';
import { AVAILABLE_TEMPLATES } from '@/lib/templates';
import { SkillsInput } from '@/components/builder/skills-input';
import { PhotoUpload } from '@/components/builder/photo-upload';
import { ResumePreview } from '@/components/builder/resume-preview';

export default function ResumeBuilderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData>(getResumePreviewData());
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get template from URL params
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam) {
      setSelectedTemplate(templateParam);
    }
  }, [searchParams]);

  const currentTemplateData = AVAILABLE_TEMPLATES.find(t => t.id === selectedTemplate);
  
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

  const updatePhoto = (photo: string | undefined, adjustments?: {
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
      skills,
    }));
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    setErrors([]);
    setSuccess(false);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          template: selectedTemplate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Failed to generate PDF']);
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
      <div className="bg-white border-b border-gray-200 px-6 py-4">
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
            <Button 
              onClick={handleGeneratePDF} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Generate PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {errors.length > 0 && (
        <div className="px-6 py-4">
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
        <div className="px-6 py-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              PDF generated successfully! Your download should start automatically.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content - Side by Side Layout */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Side - Form (40% width) */}
        <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Menu className="h-5 w-5" />
                  Resume Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-5 gap-1">
                    <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
                    <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                    <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
                    <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="space-y-4">
                      {/* Photo Upload - Only show if template supports it */}
                      {currentTemplateData?.hasPhoto && (
                        <PhotoUpload
                          photo={resumeData.personalInfo.photo}
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
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeExperience(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Company</Label>
                                    <Input
                                      value={exp.company}
                                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                      placeholder="Tech Corp"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Position</Label>
                                    <Input
                                      value={exp.position}
                                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                      placeholder="Software Engineer"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Input
                                      value={exp.startDate}
                                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                      placeholder="Jan 2020"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>End Date</Label>
                                    <Input
                                      value={exp.endDate || ''}
                                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                      placeholder="Present"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    value={exp.description}
                                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                    placeholder="Describe your responsibilities and achievements..."
                                    rows={4}
                                  />
                                </div>
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
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeEducation(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>School</Label>
                                    <Input
                                      value={edu.school}
                                      onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                      placeholder="University of Technology"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Degree</Label>
                                    <Input
                                      value={edu.degree}
                                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                      placeholder="Bachelor of Science"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Field of Study</Label>
                                    <Input
                                      value={edu.field || ''}
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
                                <div className="space-y-2">
                                  <Label>GPA (Optional)</Label>
                                  <Input
                                    value={edu.gpa || ''}
                                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                    placeholder="3.8"
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
                      <Label>Skills</Label>
                      <SkillsInput
                        skills={resumeData.skills || []}
                        onSkillsChange={updateSkills}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Preview (60% width) */}
        <div className="w-3/5 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResumePreview 
                  data={resumeData} 
                  template={selectedTemplate}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 