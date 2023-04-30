const express=require('express');
const cors=require('cors')
const { connection } = require('./db');
const userRouter = require('./routes/User.routes');
const  {authenticate}  = require('./middlewares/auth.middleware');
const { noteRouter } = require('./routes/Note.routes');
require('dotenv').config()
const app=express();
app.use(cors());
app.use(express.json());

app.use('/user',userRouter)

app.use(authenticate)
app.use('/notes',noteRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
    console.log("server is running");
});