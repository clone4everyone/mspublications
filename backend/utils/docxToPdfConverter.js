// Install these packages first:
// npm install docx-pdf mammoth pdf-lib

const mammoth = require('mammoth');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

/**
 * Convert DOCX to PDF with better formatting
 * @param {Buffer} docxBuffer - The DOCX file buffer
 * @returns {Promise<Buffer>} - PDF buffer
 */
async function convertDocxToPdf(docxBuffer) {
  try {
    console.log('Starting DOCX to PDF conversion...');
    console.log('Buffer size:', docxBuffer.length);

    // Validate input
    if (!Buffer.isBuffer(docxBuffer)) {
      throw new Error('Input must be a Buffer');
    }

    if (docxBuffer.length === 0) {
      throw new Error('Buffer is empty');
    }

    // Extract HTML from DOCX (better formatting than raw text)
    const result = await mammoth.convertToHtml({ 
      buffer: docxBuffer 
    });
    
    const html = result.value;
    console.log('HTML extracted, length:', html.length);

    if (!html || html.trim().length === 0) {
      throw new Error('No content found in document');
    }

    // Strip HTML tags and convert to plain text
    const text = html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/div>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();

    console.log('Text extracted, length:', text.length);

    if (!text || text.length === 0) {
      throw new Error('No text content after HTML parsing');
    }

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    const fontSize = 11;
    const margin = 72; // 1 inch margins
    const lineHeight = fontSize * 1.5;

    // A4 page dimensions
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const maxWidth = pageWidth - (2 * margin);

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin;

    // Split text into paragraphs
    const paragraphs = text.split(/\n\n+/);
    
    console.log('Processing', paragraphs.length, 'paragraphs');

    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) continue;

      // Split paragraph into lines that fit page width
      const lines = [];
      const words = paragraph.trim().split(/\s+/);
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const width = font.widthOfTextAtSize(testLine, fontSize);

        if (width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }

      // Draw lines on page
      for (const line of lines) {
        // Check if we need a new page
        if (yPosition < margin + lineHeight) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }

        try {
          page.drawText(line, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
            maxWidth: maxWidth,
          });
        } catch (drawError) {
          console.warn('Error drawing text, skipping line:', drawError.message);
        }

        yPosition -= lineHeight;
      }

      // Add paragraph spacing
      yPosition -= lineHeight * 0.5;
    }

    console.log('PDF created successfully');

    // Save PDF to buffer
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Error converting DOCX to PDF:', error);
    console.error('Error stack:', error.stack);
    throw new Error(`Failed to convert document to PDF: ${error.message}`);
  }
}

/**
 * Alternative: Simple text extraction for testing
 */
async function convertDocxToPdfSimple(docxBuffer) {
  try {
    // Just extract raw text
    const result = await mammoth.extractRawText({ 
      buffer: docxBuffer 
    });

    const text = result.value || 'No text found';

    // Create simple PDF
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Courier);
    const page = pdfDoc.addPage([595.28, 841.89]);
    
    page.drawText(text.substring(0, 1000), { // First 1000 chars only
      x: 50,
      y: 800,
      size: 10,
      font: font,
      maxWidth: 495,
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Simple conversion error:', error);
    throw error;
  }
}

module.exports = { 
  convertDocxToPdf,
  convertDocxToPdfSimple 
};