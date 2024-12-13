import express from 'express'
import cookie from 'cookie-parser'
import cors from "cors"

import todoRoute from "./Routes/TodoRoute.js";
import userRoute from './Routes/userRoute.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true,
}));
// http://localhost:5173
app.use('/api/v1/', todoRoute )
app.use('/api/v1/', userRoute )

export default app