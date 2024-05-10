import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import catagoryRoutes from './routes/catagoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import Razorpay from "razorpay";
import path from 'path'
import { fileURLToPath } from 'url';

//resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//configure env
dotenv.config();

//database config
connectDB();

//rest obj
const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/catagory", catagoryRoutes);
app.use("/api/v1/product", productRoutes);

//use the client app
app.use(express.static(path.join(__dirname,'/client/dist')))


//rest api
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'/client/dist/index.html'))
});

app.get('/api/getkey', (req,res) =>{
    res.status(200).json({key : process.env.RAZORPAY_API_KEY})
})

//payment
export const instance = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret : process.env.RAZORPAY_API_SECRET
})

//port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.bgCyan.white);
})