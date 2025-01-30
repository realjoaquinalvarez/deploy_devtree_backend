import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
import { corsCofig } from './config/cors';
connectDB();

const app = express();

// cors
app.use(cors(corsCofig))
// Leer datos de formularios
app.use(express.json())

app.use('/', router);

export default app;