"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const file_1 = __importDefault(require("./routes/file"));
(0, db_1.default)();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.json({ message: "Yoni" });
});
app.use('/file', file_1.default);
app.listen('3001', () => {
    console.log("Listing to 3001");
});
