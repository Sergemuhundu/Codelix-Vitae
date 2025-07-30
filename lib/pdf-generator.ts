import { ResumeData } from '@/types/resume';
import { generateHTML } from './html-generator';

export async function generatePDF(data: ResumeData, template: string = 'modern'): Promise<Buffer> {
  console.log('Generating HTML for PDF conversion for template:', template);
  
  // Use the same HTML generator as the live preview
  const html = generateHTML(data, template);
  
  // Add print-specific styles and scripts for better PDF conversion
  const htmlWithPrintStyles = html.replace('</head>', `
    <style>
      @media print {
        body { 
          margin: 0; 
          padding: 20px; 
          font-size: 12px; 
          line-height: 1.4;
        }
        .page { 
          page-break-after: always; 
          margin-bottom: 20px;
        }
        .section { 
          page-break-inside: avoid; 
          margin-bottom: 15px;
        }
        .experience-item, .education-item { 
          page-break-inside: avoid; 
          margin-bottom: 10px;
        }
      }
      
      /* Ensure consistent rendering */
      * {
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        margin: 0;
        padding: 20px;
        background: white;
        color: #333;
        line-height: 1.6;
        max-width: 210mm;
        margin: 0 auto;
      }
      
      /* Ensure images are properly sized */
      img {
        max-width: 100%;
        height: auto;
      }
      
      /* Ensure proper page breaks */
      .page-break {
        page-break-before: always;
      }
      
      /* Print instructions */
      .print-instructions {
        position: fixed;
        top: 20px;
        left: 20px;
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        padding: 15px;
        border-radius: 5px;
        font-size: 12px;
        max-width: 300px;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .print-instructions h3 {
        margin: 0 0 10px 0;
        color: #1f2937;
        font-size: 14px;
      }
      
      .print-instructions ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .print-instructions li {
        margin-bottom: 5px;
        color: #374151;
      }
      
      .print-button {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1e40af;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .print-button:hover {
        background: #1d4ed8;
      }
      
      @media print {
        .print-button,
        .print-instructions {
          display: none;
        }
      }
    </style>
    <script>
      // Auto-print functionality
      window.onload = function() {
        // Wait a bit for content to be fully rendered
        setTimeout(function() {
          // Show instructions instead of auto-printing
          console.log('Resume ready for printing');
        }, 1000);
      };
      
      // Manual print function
      function printResume() {
        try {
          window.print();
        } catch (error) {
          alert('Print failed. Please try using Ctrl+P (Windows) or Cmd+P (Mac) to print manually.');
        }
      }
      
      // Handle print events
      window.addEventListener('beforeprint', function() {
        console.log('Printing resume...');
      });
      
      window.addEventListener('afterprint', function() {
        console.log('Print completed');
      });
    </script>
    </head>
  `);
  
  // Add print instructions and button at the beginning of the body
  const htmlWithPrintElements = htmlWithPrintStyles.replace('<body>', `<body>
      <div class="print-instructions">
        <h3>📄 How to Save as PDF:</h3>
        <ul>
          <li>Click "Print Resume" button, or</li>
          <li>Press Ctrl+P (Windows) or Cmd+P (Mac)</li>
          <li>Select "Save as PDF" as destination</li>
          <li>Click "Save" to download your resume</li>
        </ul>
      </div>
      <button class="print-button" onclick="printResume()">🖨️ Print Resume</button>
  `);
  
  console.log('HTML generated successfully, size:', htmlWithPrintElements.length);
  
  // Return HTML as buffer - this will be converted to PDF by the browser
  return Buffer.from(htmlWithPrintElements, 'utf-8');
} 