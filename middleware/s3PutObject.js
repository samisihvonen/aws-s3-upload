const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const {
  fromCognitoIdentityPool
} = require('@aws-sdk/credential-provider-cognito-identity')
const s3 = require('./s3client')
// Upload file to specified bucket.
export const run = async ({ email, photo }) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: email + photo.name,
    Body: photo
  }

  try {
    const data = await client.send(new PutObjectCommand(uploadParams))
    console.log('Success', data)
    return data
  } catch (err) {
    console.log('Error', err)
  }
}
