import { NextRequest, NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf-generator';
import { ResumeData } from '@/types/resume';

export async function POST(request: NextRequest) {
  try {
    console.log('PDF generation request received');
    
    // Parse the request body
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully');
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    console.log('Request body keys:', Object.keys(body));
    
    const { resumeData, template } = body as { resumeData: ResumeData; template: string };
    
    if (!resumeData) {
      console.error('No resumeData provided');
      return NextResponse.json(
        { error: 'No resume data provided' },
        { status: 400 }
      );
    }
    
    if (!template) {
      console.error('No template provided');
      return NextResponse.json(
        { error: 'No template provided' },
        { status: 400 }
      );
    }
    
    console.log('Generating HTML for template:', template);
    console.log('Resume data keys:', Object.keys(resumeData));
    
    // Generate HTML on the server
    let htmlBuffer;
    try {
      htmlBuffer = await generatePDF(resumeData, template);
      console.log('HTML generated successfully, size:', htmlBuffer.length);
    } catch (genError) {
      console.error('Error generating HTML:', genError);
      return NextResponse.json(
        { error: `Failed to generate HTML: ${genError instanceof Error ? genError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }
    
    // Return the HTML as a response without forcing download
    try {
      const response = new NextResponse(htmlBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Length': htmlBuffer.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      
      console.log('Response created successfully');
      return response;
    } catch (responseError) {
      console.error('Error creating response:', responseError);
      return NextResponse.json(
        { error: 'Failed to create response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in PDF generation:', error);
    return NextResponse.json(
      { error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
} 