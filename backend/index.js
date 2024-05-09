import express from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './src/socket/socket.js';
import mongoConnection from './src/database.js';
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT ?? 3000;
const URL = process.env.NODE_ENVIRONMENT === 'develop' ? 'http://127.0.0.1:5173/' : 'https://chat-app-7cjy.onrender.com'

const __dirname = path.resolve();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
  origin: 'https://chat-app-7cjy.onrender.com',
  credentials: true 
};
app.use(cors(corsOptions));



app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', URL);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api', router);

app.use(express.static(path.join(__dirname, "/client/dist")));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {
    mongoConnection();
    console.log(`Server running on port ${PORT}`);
});