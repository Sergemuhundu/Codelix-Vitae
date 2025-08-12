'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  FileText,
  Sparkles,
  Upload
} from 'lucide-react';

export default function ATSOptimizerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const analyzeResume = async () => {
    setAnalyzing(true);
    
    // Simulate API call to OpenAI
    setTimeout(() => {
      setResults({
        overallScore: 78,
        sections: {
          keywords: { score: 82, suggestions: 3 },
          format: { score: 90, suggestions: 1 },
          content: { score: 75, suggestions: 4 },
          skills: { score: 65, suggestions: 2 }
        },
        suggestions: [
          {
            type: 'keywords',
            priority: 'high',
            issue: 'Missing key technical skills mentioned in job description',
            solution: 'Add "React", "Node.js", and "AWS" to your skills section'
          },
          {
            type: 'content',
            priority: 'medium',
            issue: 'Weak action verbs in experience section',
            solution: 'Replace "Responsible for" with stronger verbs like "Led", "Implemented", "Optimized"'
          },
          {
            type: 'format',
            priority: 'low',
            issue: 'Contact information could be more prominent',
            solution: 'Move email and phone number to the top of the resume'
          }
        ],
        matchedKeywords: ['JavaScript', 'Python', 'Git', 'Agile'],
        missingKeywords: ['React', 'Node.js', 'AWS', 'Docker', 'TypeScript']
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ATS Optimizer</h1>
        <p className="text-muted-foreground mt-2">
          Analyze and optimize your resume for Applicant Tracking Systems using AI-powered insights.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">
                  Drag and drop your resume or paste the text below
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Or paste your resume text:</label>
                <Textarea
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Job Description (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Paste the job description to get targeted optimization suggestions:
                </label>
                <Textarea
                  placeholder="Paste the job description here for better matching..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={analyzeResume} 
            disabled={!resumeText || analyzing}
            className="w-full"
            size="lg"
          >
            {analyzing ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      ATS Compatibility Score
                    </span>
                    <Badge variant={results.overallScore >= 80 ? 'default' : results.overallScore >= 60 ? 'secondary' : 'destructive'}>
                      {results.overallScore}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={results.overallScore} className="mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {results.overallScore >= 80 
                      ? 'Excellent! Your resume is well-optimized for ATS systems.'
                      : results.overallScore >= 60 
                        ? 'Good foundation with room for improvement.'
                        : 'Needs significant optimization to pass ATS filters.'
                    }
                  </p>
                </CardContent>
              </Card>

              {/* Section Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Section Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(results.sections).map(([section, data]: [string, any]) => (
                    <div key={section} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="capitalize font-medium">{section}</div>
                        <Badge variant="outline">
                          {data.suggestions} suggestions
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20">
                          <Progress value={data.score} />
                        </div>
                        <span className="text-sm font-medium w-10">{data.score}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Keyword Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Keyword Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Matched Keywords ({results.matchedKeywords.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.matchedKeywords.map((keyword: string, index: number) => (
                        <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Missing Keywords ({results.missingKeywords.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.missingKeywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="destructive">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.suggestions.map((suggestion: any, index: number) => (
                    <Alert key={index} className={
                      suggestion.priority === 'high' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950' :
                      suggestion.priority === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950' :
                      'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
                    }>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              suggestion.priority === 'high' ? 'destructive' :
                              suggestion.priority === 'medium' ? 'secondary' :
                              'outline'
                            }>
                              {suggestion.priority} priority
                            </Badge>
                            <span className="font-medium">{suggestion.issue}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            <strong>Solution:</strong> {suggestion.solution}
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-8 pb-8">
                <div className="text-center text-muted-foreground">
                  <Target className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg mb-2">Ready to Analyze</p>
                  <p className="text-sm">
                    Add your resume content and click "Analyze Resume" to get AI-powered optimization suggestions.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}