const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const s3Client = require('./s3');
require('dotenv').config();

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET,
    key: (req, file, cb) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const tiposAceitos = ['image/jpeg', 'image/png', 'video/mp4'];
    if (tiposAceitos.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Arquivo inválido'), false);
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

module.exports = upload;