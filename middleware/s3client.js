const { S3Client } = require('@aws-sdk/client-s3')

const creds = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
}
const s3 = new S3Client(creds)

exports.s3 = s3
