'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChatTrigger } from '@/components/chat/chat-trigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  ArrowLeft, 
  Search,
  HelpCircle,
  MessageSquare,
  Download,
  CreditCard,
  User,
  Settings
} from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    title: 'General',
    icon: HelpCircle,
    questions: [
      {
        question: 'What is CVAdapter?',
        answer: 'CVAdapter is an AI-powered resume builder that helps you create professional resumes with beautiful templates. It offers features like ATS optimization, cover letter generation, and multiple professional templates.'
      },
      {
        question: 'Is CVAdapter free to use?',
        answer: 'We offer both free and premium plans. The free plan includes basic resume building features, while premium plans offer advanced features like unlimited resumes, premium templates, and priority support.'
      },
      {
        question: 'How do I get started?',
        answer: 'Simply sign up for an account, choose a template, and start building your resume. You can add your personal information, work experience, education, and skills. Our AI will help optimize your content for better results.'
      }
    ]
  },
  {
    id: 'resume-builder',
    title: 'Resume Builder',
    icon: FileText,
    questions: [
      {
        question: 'How many resumes can I create?',
        answer: 'Free users can create up to 3 resumes, while premium users have unlimited resume creation. You can also save multiple versions of the same resume.'
      },
      {
        question: 'Can I customize the templates?',
        answer: 'Yes! All templates are fully customizable. You can change colors, fonts, layout, and add or remove sections to match your preferences.'
      },
      {
        question: 'What file formats can I download my resume in?',
        answer: 'You can download your resume as a PDF file, which is the standard format accepted by most employers and ATS systems.'
      },
      {
        question: 'How does ATS optimization work?',
        answer: 'Our ATS optimizer analyzes your resume against job descriptions and suggests improvements to help your resume pass through Applicant Tracking Systems. It checks for keywords, formatting, and content structure.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Billing',
    icon: User,
    questions: [
      {
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.'
      },
      {
        question: 'Can I cancel my subscription?',
        answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access to premium features until the end of your billing period.'
      },
      {
        question: 'How do I update my billing information?',
        answer: 'Go to your account settings and click on "Billing" to update your payment method or billing information.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, we take data security seriously. All your information is encrypted and stored securely. We never share your personal data with third parties.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: Settings,
    questions: [
      {
        question: 'The app is not loading properly. What should I do?',
        answer: 'Try refreshing your browser, clearing your cache, or using a different browser. If the problem persists, contact our support team with details about your browser and operating system.'
      },
      {
        question: 'I can\'t download my resume. What\'s wrong?',
        answer: 'Make sure you have a stable internet connection and that your browser allows downloads. Try using a different browser or contact support if the issue continues.'
      },
      {
        question: 'My changes are not saving. How can I fix this?',
        answer: 'Check your internet connection and try refreshing the page. If the problem persists, try logging out and back in, or contact our support team.'
      },
      {
        question: 'What browsers are supported?',
        answer: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.'
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter questions based on search query
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.title }))
  );

  const searchResults = allQuestions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">CVAdapter</h1>
          </div>
          <p className="text-muted-foreground">
            AI-Powered Resume Builder
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about CVAdapter. Can't find what you're looking for? 
              <Link href="/contact" className="text-primary hover:underline ml-1">
                Contact our support team
              </Link>
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
            </div>
          </div>

          {/* Category Filters */}
          {!searchQuery && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Categories
              </Button>
              {faqCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.title}
                </Button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Search Results ({searchResults.length})
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {searchResults.map((item, index) => (
                  <AccordionItem key={index} value={`search-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">
                      <div>
                        <div className="font-medium">{item.question}</div>
                        <Badge variant="secondary" className="mt-1">{item.category}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* FAQ Categories */}
          {!searchQuery && (
            <div className="space-y-8">
              {filteredCategories
                .filter(category => !selectedCategory || category.id === selectedCategory)
                .map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.questions.map((item, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left">
                              <div className="font-medium">{item.question}</div>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}

          {/* Contact Support CTA */}
          <Card className="mt-8">
            <CardHeader className="text-center">
              <CardTitle>Still Need Help?</CardTitle>
              <CardDescription>
                Can't find the answer you're looking for? Our support team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    Return to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 