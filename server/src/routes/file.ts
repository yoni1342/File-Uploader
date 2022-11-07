import express, {Request, Response} from 'express'
import multer from "multer"
import {deletFile, getFile, getFileById, uploadFile} from '../controllers/file'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const newFileName = Date.now()+file.originalname
      cb(null, file.fieldname + '-' + newFileName)
    }
})

const upload = multer({ storage: storage,limits:{fileSize:10000000} })

router.post('/',upload.single("file"), uploadFile)
router.get('/', getFile)
router.get('/:id', getFileById)
router.delete('/:id', deletFile)

export default router 