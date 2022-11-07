import multer from "multer"
import express, {Request, Response} from 'express'
import db from '../config/db'
import fs from 'fs-extra'
// import root from 'app-root-path'
const uploadFile = (req:Request, res:Response)=>{
    console.log(req.file)
    let file = {
        file_name: req.file?.originalname,
        file_size: req.file?.size,
        file_path: 'http://127.0.0.1:' + process.env.PORT + '/api/files/' + req.file?.filename
    }
    console.log(file)
    let sql = 'INSERT INTO File SET ?';
    let query = db.query(sql, file, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('File uploaded')
    })
}
const getFile = (req: Request, res: Response)=>{
    let sql = 'SELECT * FROM File'
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.json(result)
    })
}
const getFileById = (req:Request, res:Response)=>{
    const id =req.params.id
    let sql = 'SELECT * FROM File WHERE id=?'
    let query = db.query(sql, id, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.json(result)
    })
}

const deletFile =  (req:Request, res:Response)=>{
    const id =req.params.id
    let sql = 'SELECT * FROM File WHERE id=?'
    db.query(sql, id, (err, result)=>{
        if(err) throw err;
        const path = result[0].file_path.split('/')
        console.log(path[path.length-1])
        fs.remove(`./uploads/${path[path.length-1]}`)
        .then(()=>{
            sql  = 'DELETE FROM File WHERE id=?'
            db.query(sql,id,(err, result)=>{
                if(err) throw err;
                res.json({message: 'File has been deleted'})
            })
        }).catch(err=>{
            console.log(err)
        })
    })

    
}

export {uploadFile, getFile, getFileById,deletFile}