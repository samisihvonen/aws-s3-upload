const User = require('../models/userModel.js')
const mongoose = require('mongoose')
const resizeAndUploadToS3 = require('../middleware/uploadFile')
const dotenv = require('dotenv')
dotenv.config()

const createUser = async (req, res) => {
  try {
    const { fname, lname, email } = req.body

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      lname: lname,
      fname: fname,
      email: email,
      avatar: req.file.originalname
    })
    await user.save()
    res.status(201).json({
      success: true,
      message: 'Successfully uploaded',
      user: user
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err })
  }
}

module.exports = { createUser }
