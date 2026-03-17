"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'secreto123';
const generarToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '8h' });
};
exports.generarToken = generarToken;
const verificarToken = (token) => {
    return jsonwebtoken_1.default.verify(token, SECRET);
};
exports.verificarToken = verificarToken;
