const { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require("multer");

// ✅ AWS SDK v3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const generatePresignedUploadUrl = async (filename, contentType, journal = 'general') => {
  const key = generateS3Key(filename, journal);
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(s3, command, { 
    expiresIn: 300 // 5 minutes - enough time for upload
  });

  return { presignedUrl, key };
};
// ✅ Use MEMORY storage to enable DOCX to PDF conversion
// Files will be in req.file.buffer, then manually uploaded to S3 after conversion
const uploadDocument = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});


// ✅ Helper function to upload buffer to S3
const uploadToS3 = async (buffer, key, contentType, metadata = {}) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    Metadata: metadata,
  });

  await s3.send(command);
  return key;
};

// ✅ Helper to generate S3 key
const generateS3Key = (originalFilename, journal = 'general') => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `submissions/${journal}/${uniqueSuffix}-${originalFilename}`;
};

// ✅ Signed URL (v3)
const getSignedFileUrl = async (key, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn });
};

// ✅ Get file buffer from S3
const getBufferFromS3 = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const response = await s3.send(command);
  
  // Convert stream to buffer
  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

// ✅ Delete file
const deleteFile = async (key) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
    );
    return true;
  } catch (err) {
    console.error('Delete file error:', err);
    return false;
  }
};

module.exports = {
  s3,
  uploadDocument,
  uploadToS3,
  generateS3Key,
  getSignedFileUrl,
  getBufferFromS3,
  deleteFile,
  generatePresignedUploadUrl

};