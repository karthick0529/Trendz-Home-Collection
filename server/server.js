const express = require('express')
const cors = require('cors')
const path = require('path');
const Razorpay = require("razorpay");
require('dotenv').config();

const app = express();
const corsOptions ={
    origin: ["http://localhost:5173" , "https://trendz-home-collection.vercel.app/"],
    method:"GET, POST, PUT, DELETE, PATCH, HEAD",
    Credential:true
};


app.use('/files', express.static(path.join(__dirname, 'files')));


app.use(cors(corsOptions));

const fileUpload = require('express-fileupload');
app.use(fileUpload());


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY ,
    key_secret: process.env.RAZORPAY_SECRET ,
  });



  app.post("/verify-payment", async (req, res) => {
    const { payment_id, order_id, signature } = req.body;
  
    // Verification logic
    const isValid = await razorpay.utility.verifyPayment({
      payment_id,
      order_id,
      signature,
    });
  
    if (isValid) {
      // Payment is verified
      res.status(200).send("Payment verified successfully.");
    } else {
      res.status(400).send("Payment verification failed.");
    }
  });



const PORT = process.env.PORT || 5000

app.use(express.json());

const productRoutes = require("./routes/Product")

app.use('/api/v1/', productRoutes);



const db = require('./config/database')
db();

app.listen(PORT, ()=>{
    console.log(`App running on PORT number ${PORT}`)
})

app.get('/', (req,res)=>{
    res.send("Hello Karthick");
})
