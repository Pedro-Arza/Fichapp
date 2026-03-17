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
const empleados_service_1 = __importDefault(require("../service/empleados.service"));
class EmpleadoController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleados = yield empleados_service_1.default.listarEmpleados();
                res.json(empleados);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    obtenerPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleado = yield empleados_service_1.default.obtenerEmpleadoPorId(req.params.id);
                if (!empleado)
                    return res.status(404).json({ error: 'Empleado no encontrado' });
                res.json(empleado);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleado = yield empleados_service_1.default.crearEmpleado(req.body);
                res.status(201).json(empleado);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleado = yield empleados_service_1.default.actualizarEmpleado(req.params.id, req.body);
                res.json(empleado);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield empleados_service_1.default.eliminarEmpleado(req.params.id);
                res.json(resultado);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    obtenerPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const perfil = yield empleados_service_1.default.obtenerPerfil(req.params.id);
                res.json(perfil);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new EmpleadoController();
