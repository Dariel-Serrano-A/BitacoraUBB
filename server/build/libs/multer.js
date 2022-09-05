"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
// Settings
const allowedExtensions = /(.jpg|.jpeg|.png|.pdf|.txt)$/i;
const storage = multer_1.default.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        if (file) {
            if (allowedExtensions.exec(file.originalname)) {
                cb(null, (new Date().toLocaleDateString("es-CL", { timeZone: "America/Santiago" }).split('-').reverse().join('-')) + '-' + (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
            }
        }
    }
});
exports.default = (0, multer_1.default)({ storage });
