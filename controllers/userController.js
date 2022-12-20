const User = require('../models/userModel.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const createUser = async (req, res) => {
  try {
    const { fname, lname, email } = req.body

    console.log('file:', req.file[0])
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      fname: fname,
      lname: lname,
      email: email
      // avatar: req.files['avatar'][0]
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
