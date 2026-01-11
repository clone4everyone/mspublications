const { execFile } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');

const execFileAsync = promisify(execFile);

/**
 * Find LibreOffice installation path on Windows
 */
const findLibreOfficePath = () => {
  const possiblePaths = [
    'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
    'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
    'C:\\Program Files\\LibreOffice 7\\program\\soffice.exe',
    'C:\\Program Files\\LibreOffice 24\\program\\soffice.exe',
  ];

  for (const libreOfficePath of possiblePaths) {
    try {
      require('fs').accessSync(libreOfficePath);
      console.log('✅ Found LibreOffice at:', libreOfficePath);
      return libreOfficePath;
    } catch (err) {
      // Path doesn't exist, continue
    }
  }

  throw new Error('LibreOffice not found. Please install from https://www.libreoffice.org/download/');
};

/**
 * Convert DOCX buffer to PDF using LibreOffice directly
 * @param {Buffer} docxBuffer - The DOCX file buffer
 * @returns {Promise<Buffer>} - The converted PDF buffer
 */
const convertDocxToPdf = async (docxBuffer) => {
  const tempDir = path.join(os.tmpdir(), `docx-conversion-${Date.now()}`);
  const inputPath = path.join(tempDir, 'input.docx');
  const outputDir = tempDir;

  try {
    console.log('🔄 Starting LibreOffice conversion...');
    console.log('📊 Input buffer size:', docxBuffer.length, 'bytes');

    // Validate buffer
    if (!Buffer.isBuffer(docxBuffer) || docxBuffer.length === 0) {
      throw new Error('Invalid or empty DOCX buffer');
    }

    // Find LibreOffice
    const libreOfficePath = findLibreOfficePath();

    // Create temp directory
    await fs.mkdir(tempDir, { recursive: true });
    console.log('📁 Created temp directory:', tempDir);

    // Write DOCX buffer to temp file
    await fs.writeFile(inputPath, docxBuffer);
    console.log('💾 Wrote DOCX to temp file');

    // Convert using LibreOffice
    // --headless: run without GUI
    // --convert-to pdf: output format
    // --outdir: output directory
    const args = [
      '--headless',
      '--convert-to',
      'pdf',
      '--outdir',
      outputDir,
      inputPath
    ];

    console.log('⚙️ Running LibreOffice conversion...');
    console.log('🔧 Command:', libreOfficePath, args.join(' '));

    const { stdout, stderr } = await execFileAsync(libreOfficePath, args, {
      timeout: 60000, // 60 second timeout
      windowsHide: true
    });

    if (stdout) console.log('📝 LibreOffice stdout:', stdout);
    if (stderr) console.warn('⚠️ LibreOffice stderr:', stderr);

    // Read the converted PDF
    const outputPath = path.join(outputDir, 'input.pdf');
    
    // Check if file exists
    try {
      await fs.access(outputPath);
    } catch (err) {
      throw new Error('PDF conversion failed - output file not created');
    }

    const pdfBuffer = await fs.readFile(outputPath);
    
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Conversion resulted in empty PDF');
    }

    console.log('✅ LibreOffice conversion successful!');
    console.log('📊 Output PDF size:', pdfBuffer.length, 'bytes');

    return pdfBuffer;

  } catch (error) {
    console.error('❌ LibreOffice conversion failed:', error);
    
    // Provide helpful error messages
    if (error.message.includes('not found')) {
      throw new Error('LibreOffice is not installed. Please install from https://www.libreoffice.org/download/');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Conversion timed out. The file may be too large or complex.');
    }
    
    throw new Error(`DOCX to PDF conversion failed: ${error.message}`);
    
  } finally {
    // Clean up temp files
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
      console.log('🧹 Cleaned up temp files');
    } catch (cleanupError) {
      console.warn('⚠️ Failed to clean up temp files:', cleanupError.message);
    }
  }
};

module.exports = {
  convertDocxToPdf,
  findLibreOfficePath
};