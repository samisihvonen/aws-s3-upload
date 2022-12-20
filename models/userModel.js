const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: false
    },
    fname: {
      type: String,
      required: [true, 'Firstname is required']
    },
    lname: {
      type: String,
      required: [true, 'Lastname is required']
    },
    email: {
      type: String,
      required: [true, 'Please add an email']
    },
    avatar: { image: Buffer, contentType: String }
  },
  { timestamps: true }
)
const userModel = mongoose.model('user', userSchema)

module.exports = userModel
