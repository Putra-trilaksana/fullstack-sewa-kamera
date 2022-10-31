import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {UserRouter} from './src/routes/index.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/users", UserRouter);

app.listen(port, () => {
    console.log(`Server running at PORT ${port}`)
})