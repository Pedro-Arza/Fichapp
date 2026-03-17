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
class EmpleadoService {
    // Admin: listar todos los empleados
    listarEmpleados() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield empleados_model_1.default.findAll();
        });
    }
    // Admin: obtener empleado por id
    obtenerEmpleadoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield empleados_model_1.default.findByPk(id);
        });
    }
    // Admin: crear empleado
    crearEmpleado(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield empleados_model_1.default.create(datos);
        });
    }
    // Admin: actualizar empleado
    actualizarEmpleado(id, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const empleado = yield empleados_model_1.default.findByPk(id);
            if (!empleado)
                throw new Error('Empleado no encontrado');
            return yield empleado.update(datos);
        });
    }
    // Admin: eliminar empleado
    eliminarEmpleado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const empleado = yield empleados_model_1.default.findByPk(id);
            if (!empleado)
                throw new Error('Empleado no encontrado');
            yield empleado.destroy();
            return { mensaje: 'Empleado eliminado correctamente' };
        });
    }
    // Empleado: ver su perfil
    obtenerPerfil(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield empleados_model_1.default.findByPk(id, {
                attributes: { exclude: ['password_hash'] }
            });
        });
    }
}
exports.default = new EmpleadoService();
