import express, {Request, Response} from 'express'
import db from './config/db'
import fileRouter from './routes/file'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql conncted")
})  
const app = express()

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',(req:Request,res:Response):void=>{
    res.json({message:"Yoni"})
})
app.use('/api/files', express.static(path.join(__dirname, '../uploads')))
app.use('/file', fileRouter)
app.listen(process.env.PORT, ():void=>{
    console.log(`Listing to ${process.env.PORT}` )
})