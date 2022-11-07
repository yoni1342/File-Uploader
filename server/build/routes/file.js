"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const file_1 = require("../controllers/file");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const newFileName = file.originalname + Date.now();
        cb(null, file.fieldname + '-' + newFileName);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/', upload.single("file"), file_1.uploadFile);
exports.default = router;
