"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// create connection
const connectdb = () => {
    const db = mysql_1.default.createConnection({
        host: 'sql8.freesqldatabase.com',
        user: 'sql8549369',
        password: 'JgdDKFUJMX',
        database: 'sql8549369'
    });
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log("Mysql conncted");
    });
};
exports.default = connectdb;
