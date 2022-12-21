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
      unique: [true, 'Email is already taken'],
      required: [true, 'Please add an email']
    },
    avatar: [
      {
        type: String,
        default: 'no-photo.jpg'
      }
    ]
  },
  { timestamps: true }
)
const userModel = mongoose.model('user', userSchema)

module.exports = userModel
