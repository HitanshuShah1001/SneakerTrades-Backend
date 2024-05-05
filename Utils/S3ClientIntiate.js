const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { setFilename } = require("./setFileName");
require("dotenv").config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: "AKIA47CRW6GSP3RAGDUM",
    secretAccessKey: "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",
  },
  region: "eu-north-1",
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
