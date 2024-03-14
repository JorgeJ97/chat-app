import express from 'express'
import morgan from 'morgan'
import router from './src/routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './src/socket/socket.js'
import mongoConnection from './src/database.js'

const PORT = process.env.PORT ?? 3000

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

app.use('/api', router);


server.listen(PORT, () => {
    mongoConnection();
    console.log(`Server running on port ${PORT}`)
})