const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
const path = require('path')

const credentials = {
  region: 'eu-north-1',
  credentials: {
    accessKeyId: 'AKIA2LEM2G472A5F62O7',
    secretAccessKey: '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'
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
    bucket: 'eternia-s3',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      var filename =
        file.originalname.replace(path.extname(file.originalname), '@') +
        Date.now() +
        path.extname(file.originalname)
      file.originalname = filename
      cb(null, filename)
    }
  })
})

exports.uploadS3 = uploadS3
