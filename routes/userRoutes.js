const express = require('express')
const { createUser } = require('../controllers/userController')
const { uploadS3 } = require('../middleware/uploadFile')

const router = express.Router()

// handle file uploads
router.post('/user', uploadS3.single('avatar'), createUser)

module.exports = router
