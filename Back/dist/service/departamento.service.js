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
const departamentos_model_1 = __importDefault(require("../models/departamentos.model"));
class DepartamentoService {
    // Admin: listar departamentos
    listarDepartamentos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield departamentos_model_1.default.findAll();
        });
    }
    // Admin: obtener departamento por id
    obtenerDepartamentoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const departamento = yield departamentos_model_1.default.findByPk(id);
            if (!departamento)
                throw new Error('Departamento no encontrado');
            return departamento;
        });
    }
    // Admin: crear departamento
    crearDepartamento(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield departamentos_model_1.default.create(datos);
        });
    }
    // Admin: actualizar departamento
    actualizarDepartamento(id, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const departamento = yield departamentos_model_1.default.findByPk(id);
            if (!departamento)
                throw new Error('Departamento no encontrado');
            return yield departamento.update(datos);
        });
    }
    // Admin: eliminar departamento
    eliminarDepartamento(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const departamento = yield departamentos_model_1.default.findByPk(id);
            if (!departamento)
                throw new Error('Departamento no encontrado');
            yield departamento.destroy();
            return { mensaje: 'Departamento eliminado correctamente' };
        });
    }
}
exports.default = new DepartamentoService();
