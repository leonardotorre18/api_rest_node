import express, { type Express } from 'express'
import routes from '../routes'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from '../swagger/config'
import path from 'path'
// import swaggerDocument from "../swagger/config.json"

dotenv.config()

const app: Express = express()

mongoose.connect(process.env.DATABASE_URL ?? '')
  .then(() => {
    console.log('Database is connect...')
  })
  .catch((err) => {
    console.log('Database connection Error')
    console.log(err)
  })

app.use(cors())
app.use(express.urlencoded({ extended: false, limit: '25mb' }))
app.use(express.json({ limit: '25mb' }))
app.use(morgan('dev'))

// Static Route
app.use(express.static(path.join(__dirname, '../public')))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(
  swaggerJSDoc(swaggerOptions)
  // swaggerOptions
  // swaggerDocument
))

app.use('/', routes)

export default app
