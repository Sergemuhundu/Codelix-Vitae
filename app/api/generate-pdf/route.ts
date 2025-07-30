import { NextRequest, NextResponse } from 'next/server';
import { generateHTML } from '@/lib/html-generator';
import { ResumeData } from '@/types/resume';
import puppeteer from 'puppeteer';

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
    
    console.log('Generating PDF for template:', template);
    console.log('Resume data keys:', Object.keys(resumeData));
    
    // Generate HTML first
    let htmlContent;
    try {
      htmlContent = generateHTML(resumeData, template);
      console.log('HTML generated successfully, length:', htmlContent.length);
    } catch (genError) {
      console.error('Error generating HTML:', genError);
      return NextResponse.json(
        { error: `Failed to generate HTML: ${genError instanceof Error ? genError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }
    
    // Convert HTML to PDF using Puppeteer
    let pdfBuffer;
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate PDF
      pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        },
        displayHeaderFooter: false,
        preferCSSPageSize: true
      });
      
      await browser.close();
      console.log('PDF generated successfully, size:', pdfBuffer.length);
    } catch (pdfError) {
      console.error('Error generating PDF:', pdfError);
      return NextResponse.json(
        { error: `Failed to generate PDF: ${pdfError instanceof Error ? pdfError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }
    
    // Return the PDF as a response
    try {
      const response = new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Length': pdfBuffer.length.toString(),
          'Content-Disposition': `attachment; filename="resume-${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}.pdf"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      
      console.log('PDF response created successfully');
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