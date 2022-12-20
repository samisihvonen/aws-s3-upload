const express = require('express')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const path = require('path')
const connectDB = require('./config/db.js')
const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')

const app = express()

connectDB()

app.use(cors())

app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use((req, res, err, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Cross-Origin-Resource-Policy',
    'same-site' | 'same-origin' | 'cross-origin'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE' // what matters here is that OPTIONS is present
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, X-Requested-With-Credentials',
    'Accept'
  )
  if (err) {
    console.error(err.stack, err.message)
    res.status(500).send('Something broke!')
  }
  next()
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html')
})

app.use(express.static(path.join(__dirname, '/public')))
// app.use('/uploads', express.static(path.join('uploads')))

app.use('/uploads', express.static('uploads'))

// routes
app.use('/api', userRoutes)

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to my API' })
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
