const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { setFilename } = require("./setFileName");
require("dotenv").config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_BUCKET_REGION,
});

const s3Storage = (bucketName) =>
  multerS3({
    s3: s3, // s3 instance
    bucket: bucketName, // change it as per your project requirement // storage access type
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = setFilename(req, file);
      cb(null, fileName);
    },
  });

module.exports = s3Storage;
