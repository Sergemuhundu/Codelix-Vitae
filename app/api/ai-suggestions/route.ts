import { NextRequest, NextResponse } from 'next/server';
import { openAIService } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let result;
    switch (type) {
      case 'job_titles':
        result = await openAIService.getJobTitleSuggestions(
          data.currentTitle,
          data.experience,
          data.skills
        );
        break;
      
      case 'skills':
        result = await openAIService.getSkillSuggestions(
          data.jobTitle,
          data.currentSkills,
          data.experience
        );
        break;
      
      case 'summaries':
        result = await openAIService.getSummarySuggestions(
          data.jobTitle,
          data.experience,
          data.skills,
          data.currentSummary
        );
        break;
      
      case 'descriptions':
        result = await openAIService.getDescriptionSuggestions(
          data.position,
          data.company,
          data.startDate,
          data.endDate,
          data.currentDescription,
          data.skills,
          data.jobTitle
        );
        break;
      
      case 'keywords':
        result = await openAIService.getKeywordSuggestions(
          data.jobTitle,
          data.jobDescription
        );
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid suggestion type' },
          { status: 400 }
        );
    }

    console.log('AI suggestions result:', JSON.stringify(result, null, 2));
    return NextResponse.json(result);
  } catch (error) {
    console.error('AI suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
} 