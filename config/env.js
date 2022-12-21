require('dotenv').config

const env = {
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  awsAccessPoint: process.env.AWS_ACCESS_POINT,
  awsBucket: process.env.AWS_BUCKET,
  
}
module.exports = env
