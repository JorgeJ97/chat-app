import express from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import { app, server } from './src/socket/socket.js';
import mongoConnection from './src/database.js';

const PORT = process.env.PORT ?? 3000;

const __dirname = path.resolve();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use('/api', router);

app.use(express.static(path.join(__dirname, "/client/dist")));


app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {
    mongoConnection();
    console.log(`Server running on port ${PORT}`);
});