'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Lightbulb, 
  Sparkles, 
  Loader2, 
  Check, 
  Copy,
  Briefcase,
  Target,
  FileText,
  Hash
} from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { toast } from '@/hooks/use-toast';

interface AISuggestion {
  type: 'job_title' | 'skill' | 'summary' | 'experience' | 'keyword';
  content: string;
  confidence: number;
  reasoning?: string;
}

interface JobTitleSuggestion {
  title: string;
  description: string;
  salary_range?: string;
  requirements?: string[];
}

interface AISuggestionsProps {
  resumeData: ResumeData;
  onUpdateResume: (updates: Partial<ResumeData>) => void;
}

export function AISuggestions({ resumeData, onUpdateResume }: AISuggestionsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<{
    jobTitles: JobTitleSuggestion[];
    skills: AISuggestion[];
    summaries: AISuggestion[];
    keywords: AISuggestion[];
  }>({
    jobTitles: [],
    skills: [],
    summaries: [],
    keywords: []
  });

  const getJobTitleSuggestions = async () => {
    setLoading('jobTitles');
    try {
      const experience = resumeData.experience?.map(exp => 
        `${exp.position} at ${exp.company}`
      ).join(', ') || '';
      
      const skills = resumeData.skills || [];
      
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'job_titles',
          data: {
            currentTitle: resumeData.personalInfo.title,
            experience,
            skills
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get job title suggestions');
      }

      const suggestions = await response.json();
      setSuggestions(prev => ({ ...prev, jobTitles: suggestions }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get job title suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const getSkillSuggestions = async () => {
    setLoading('skills');
    try {
      const experience = resumeData.experience?.map(exp => 
        `${exp.position} at ${exp.company}`
      ).join(', ') || '';
      
      const currentSkills = resumeData.skills || [];
      
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'skills',
          data: {
            jobTitle: resumeData.personalInfo.title,
            currentSkills,
            experience
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get skill suggestions');
      }

      const suggestions = await response.json();
      setSuggestions(prev => ({ ...prev, skills: suggestions }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get skill suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const getSummarySuggestions = async () => {
    setLoading('summaries');
    try {
      const experience = resumeData.experience?.map(exp => 
        `${exp.position} at ${exp.company}`
      ).join(', ') || '';
      
      const skills = resumeData.skills || [];
      
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'summaries',
          data: {
            jobTitle: resumeData.personalInfo.title,
            experience,
            skills,
            currentSummary: resumeData.summary
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get summary suggestions');
      }

      const suggestions = await response.json();
      setSuggestions(prev => ({ ...prev, summaries: suggestions }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get summary suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const getKeywordSuggestions = async () => {
    setLoading('keywords');
    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'keywords',
          data: {
            jobTitle: resumeData.personalInfo.title
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get keyword suggestions');
      }

      const suggestions = await response.json();
      setSuggestions(prev => ({ ...prev, keywords: suggestions }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get keyword suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const applySuggestion = (type: string, content: string) => {
    switch (type) {
      case 'job_title':
        onUpdateResume({
          personalInfo: {
            ...resumeData.personalInfo,
            title: content
          }
        });
        break;
      case 'skill':
        const currentSkills = resumeData.skills || [];
        if (!currentSkills.includes(content)) {
          onUpdateResume({
            skills: [...currentSkills, content]
          });
        }
        break;
      case 'summary':
        onUpdateResume({ summary: content });
        break;
    }
    
    toast({
      title: "Applied",
      description: "Suggestion applied to your resume!",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Title Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Title Suggestions
            </h4>
            <Button
              size="sm"
              variant="outline"
              onClick={getJobTitleSuggestions}
              disabled={loading === 'jobTitles'}
            >
              {loading === 'jobTitles' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4" />
              )}
              Get Suggestions
            </Button>
          </div>
          
          {suggestions.jobTitles.length > 0 && (
            <div className="space-y-2">
              {suggestions.jobTitles.map((suggestion, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium">{suggestion.title}</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {suggestion.description}
                      </p>
                      {suggestion.salary_range && (
                        <Badge variant="secondary" className="mt-2">
                          {suggestion.salary_range}
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applySuggestion('job_title', suggestion.title)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skill Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Skill Suggestions
            </h4>
            <Button
              size="sm"
              variant="outline"
              onClick={getSkillSuggestions}
              disabled={loading === 'skills'}
            >
              {loading === 'skills' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4" />
              )}
              Get Suggestions
            </Button>
          </div>
          
          {suggestions.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.skills.map((suggestion, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => applySuggestion('skill', suggestion.content)}
                  >
                    {suggestion.content}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => applySuggestion('skill', suggestion.content)}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Summary Suggestions
            </h4>
            <Button
              size="sm"
              variant="outline"
              onClick={getSummarySuggestions}
              disabled={loading === 'summaries'}
            >
              {loading === 'summaries' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4" />
              )}
              Get Suggestions
            </Button>
          </div>
          
          {suggestions.summaries.length > 0 && (
            <div className="space-y-3">
              {suggestions.summaries.map((suggestion, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      Option {index + 1}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(suggestion.content)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => applySuggestion('summary', suggestion.content)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={suggestion.content}
                    readOnly
                    className="min-h-[80px] text-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Keyword Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Keyword Suggestions
            </h4>
            <Button
              size="sm"
              variant="outline"
              onClick={getKeywordSuggestions}
              disabled={loading === 'keywords'}
            >
              {loading === 'keywords' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4" />
              )}
              Get Suggestions
            </Button>
          </div>
          
          {suggestions.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.keywords.map((suggestion, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => applySuggestion('skill', suggestion.content)}
                >
                  {suggestion.content}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 