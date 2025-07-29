'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  FileText, 
  Download, 
  Copy,
  RefreshCw,
  Building,
  User,
  Target
} from 'lucide-react';

export default function CoverLetterPage() {
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    tone: 'professional',
    experience: '',
    skills: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState('');

  const generateCoverLetter = async () => {
    setGenerating(true);
    
    // Simulate API call to OpenAI
    setTimeout(() => {
      const sampleLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.jobTitle || 'Software Engineer'} position at ${formData.companyName || 'your company'}. With my extensive background in software development and proven track record of delivering high-quality solutions, I am confident that I would be a valuable addition to your team.

In my previous roles, I have developed expertise in ${formData.skills || 'various technologies'}, which aligns perfectly with the requirements outlined in your job posting. My experience includes:

• Designing and implementing scalable web applications using modern frameworks
• Collaborating with cross-functional teams to deliver projects on time and within budget
• Optimizing application performance and ensuring high code quality standards
• Mentoring junior developers and contributing to team knowledge sharing

${formData.experience ? `Additionally, ${formData.experience}` : ''}

I am particularly drawn to ${formData.companyName || 'your company'} because of your commitment to innovation and excellence in the technology space. I am excited about the opportunity to contribute to your mission and help drive continued success.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can contribute to your team's success.

Sincerely,
[Your Name]`;
      
      setGeneratedLetter(sampleLetter);
      setGenerating(false);
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Cover Letter Generator</h1>
        <p className="text-muted-foreground mt-2">
          Create compelling, personalized cover letters tailored to specific job opportunities.
        </p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate New Letter</TabsTrigger>
          <TabsTrigger value="templates">My Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Job Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g., Software Engineer"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="e.g., Google"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the job description here for better personalization..."
                      rows={4}
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Your Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Key Skills</Label>
                    <Textarea
                      id="skills"
                      placeholder="List your relevant skills and technologies..."
                      rows={3}
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Highlight your most relevant experience and achievements..."
                      rows={4}
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <div className="flex gap-2">
                      {['professional', 'enthusiastic', 'conversational'].map((tone) => (
                        <Badge
                          key={tone}
                          variant={formData.tone === tone ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => setFormData({...formData, tone})}
                        >
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={generateCoverLetter}
                disabled={!formData.jobTitle || !formData.companyName || generating}
                className="w-full"
                size="lg"
              >
                {generating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating Your Cover Letter...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </div>

            {/* Generated Letter */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Generated Cover Letter
                    </CardTitle>
                    {generatedLetter && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={generateCoverLetter}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {generatedLetter ? (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-card border rounded-lg p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap min-h-[600px]">
                        {generatedLetter}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-20">
                      <Sparkles className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p className="text-lg mb-2">Ready to Generate</p>
                      <p className="text-sm">
                        Fill in the job information and click "Generate Cover Letter" to create a personalized letter.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Saved Cover Letter Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg mb-2">No saved templates yet</p>
                <p className="text-sm">
                  Your generated cover letters will appear here for future reference.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}