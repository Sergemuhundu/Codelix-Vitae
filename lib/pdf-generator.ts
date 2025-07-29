import { ResumeData } from '@/types/resume';
import { generateHTML } from './html-generator';

export async function generatePDF(data: ResumeData, template: string = 'modern'): Promise<Buffer> {
  console.log('Generating HTML for PDF');
  
  // Use the same HTML generator as the live preview
  const html = generateHTML(data, template);
  
  // Add print-specific scripts and styles
  const htmlWithPrintScripts = html.replace('</head>', `
    <script>
      // Wait for content to be fully loaded before triggering print
      window.onload = function() {
        // Wait a bit longer to ensure all content is rendered
        setTimeout(function() {
          try {
            window.print();
          } catch (error) {
            console.log('Auto-print failed, user can use manual print button');
          }
        }, 1000);
      };
      
      // Manual print function
      function printResume() {
        try {
          window.print();
        } catch (error) {
          alert('Print failed. Please try using Ctrl+P or Cmd+P to print manually.');
        }
      }
      
      // Handle print events
      window.addEventListener('beforeprint', function() {
        console.log('Printing resume...');
      });
      
      window.addEventListener('afterprint', function() {
        console.log('Print completed');
      });
      
      // Fallback: if onload doesn't work, try after DOMContentLoaded
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
          if (document.readyState === 'complete') {
            try {
              window.print();
            } catch (error) {
              console.log('Auto-print failed on DOMContentLoaded');
            }
          }
        }, 1500);
      });
    </script>
    <style>
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
      }
      
      .print-button:hover {
        background: #1d4ed8;
      }
      
      .instructions {
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
      }
      
      .instructions h3 {
        margin: 0 0 10px 0;
        color: #1f2937;
      }
      
      .instructions ul {
        margin: 0;
        padding-left: 20px;
      }
      
      .instructions li {
        margin-bottom: 5px;
        color: #374151;
      }
      
      @media print {
        .print-button,
        .instructions {
          display: none;
        }
      }
    </style>
    </head>
    <body>
      <div class="instructions">
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
  
  console.log('HTML generated successfully, size:', htmlWithPrintScripts.length);
  
  return Buffer.from(htmlWithPrintScripts, 'utf-8');
} 