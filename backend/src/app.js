import express from 'express'
import morgan from 'morgan'
import router from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

export const app = express()

dotenv.config()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  credentials: true 
};
app.use(cors(corsOptions));

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.use('/api', router)
