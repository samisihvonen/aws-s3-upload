const env = require('../config/env')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
const sharp = require('sharp')
const path = require('path')

const credentials = {
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretAccessKey
  }
}

const s3 = new S3Client(credentials)

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false)
  }
}

var uploadS3 = multer({
  storage: multerS3({
    fileFilter,
    s3: s3,
    bucket: env.awsBucket,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      var filename =
        file.originalname.replace(path.extname(file.originalname), '@') +
        Date.now() +
        path.extname(file.originalname)
      file.originalname = filename
      cb(null, 'images/'+ filename)
    }
  })
})

exports.uploadS3 = uploadS3
