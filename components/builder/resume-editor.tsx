'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, User, Briefcase, GraduationCap, Wrench } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: any[];
  education: any[];
  skills: string[];
}

interface ResumeEditorProps {
  data: ResumeData;
  onDataChange: (data: ResumeData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ResumeEditor({ data, onDataChange, onNext, onBack }: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState('personal');

  const updatePersonalInfo = (field: string, value: string) => {
    onDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const addExperience = () => {
    onDataChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now(),
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    });
  };

  const updateExperience = (id: number, field: string, value: any) => {
    onDataChange({
      ...data,
      experience: data.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: number) => {
    onDataChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id),
    });
  };

  const addEducation = () => {
    onDataChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now(),
          degree: '',
          institution: '',
          location: '',
          graduationDate: '',
          gpa: '',
          description: '',
        },
      ],
    });
  };

  const updateEducation = (id: number, field: string, value: string) => {
    onDataChange({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: number) => {
    onDataChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id),
    });
  };

  const addSkill = () => {
    onDataChange({
      ...data,
      skills: [...data.skills, ''],
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    onDataChange({
      ...data,
      skills: newSkills,
    });
  };

  const removeSkill = (index: number) => {
    onDataChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">Edit Your Resume</h2>
        <p className="text-muted-foreground">Fill in your information to build your professional resume.</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 m-6 mb-0">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6 pt-4">
            <TabsContent value="personal" className="space-y-4 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={data.personalInfo.firstName}
                      onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={data.personalInfo.lastName}
                      onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={data.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={data.personalInfo.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      rows={4}
                      value={data.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                      placeholder="Write a compelling professional summary..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Work Experience</h3>
                <Button onClick={addExperience} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              
              {data.experience.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No work experience added yet. Click "Add Experience" to get started.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    <Card key={exp.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Experience {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Tech Corp"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="education" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Education</h3>
                <Button onClick={addEducation} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
              
              {data.education.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No education added yet. Click "Add Education" to get started.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <Card key={edu.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Education {index + 1}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Bachelor of Science"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            placeholder="University of Technology"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Graduation Date</Label>
                          <Input
                            type="month"
                            value={edu.graduationDate}
                            onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GPA (Optional)</Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="3.8"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="skills" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Skills</h3>
                <Button onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  {data.skills.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No skills added yet. Click "Add Skill" to get started.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {data.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            placeholder="e.g., JavaScript, Project Management"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="border-t border-border p-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Templates
          </Button>
          <Button onClick={onNext}>
            Continue to Design
          </Button>
        </div>
      </div>
    </div>
  );
}