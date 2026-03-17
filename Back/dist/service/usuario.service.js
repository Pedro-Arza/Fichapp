"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empleados_model_1 = __importDefault(require("../models/empleados.model"));
const JWTLogin_1 = require("../Login/JWTLogin");
const crypto_1 = __importDefault(require("crypto"));
class UsuarioService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const password_hash = crypto_1.default.createHash('md5').update(password).digest('hex');
            const empleado = yield empleados_model_1.default.findOne({
                where: { email, password_hash },
                attributes: { exclude: ['password_hash'] }
            });
            if (!empleado)
                throw new Error('Credenciales incorrectas');
            const token = (0, JWTLogin_1.generarToken)({
                id: empleado.getDataValue('id'),
                email: empleado.getDataValue('email'),
                rol: empleado.getDataValue('rol')
            });
            return { token, empleado };
        });
    }
}
exports.default = new UsuarioService();
