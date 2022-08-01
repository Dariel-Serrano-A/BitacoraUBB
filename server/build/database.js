"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool(keys_1.default.database);
const poolPromise = pool.promise();
exports.default = poolPromise;
