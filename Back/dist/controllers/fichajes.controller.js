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
const fichajes_service_1 = __importDefault(require("../service/fichajes.service"));
class FichajeController {
    eliminar(arg0, eliminar) {
        throw new Error('Method not implemented.');
    }
    actualizar(arg0, actualizar) {
        throw new Error('Method not implemented.');
    }
    listarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fichajes = yield fichajes_service_1.default.listarTodosFichajes();
                res.json(fichajes);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    listarPorEmpleado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fichajes = yield fichajes_service_1.default.listarFichajesPorEmpleado(req.params.empleado_id);
                res.json(fichajes);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    obtenerHoy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fichajes = yield fichajes_service_1.default.obtenerFichajesHoy(req.params.empleado_id);
                res.json(fichajes);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    obtenerPorFechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha_inicio, fecha_fin } = req.query;
                const fichajes = yield fichajes_service_1.default.obtenerFichajesPorFechas(req.params.empleado_id, fecha_inicio, fecha_fin);
                res.json(fichajes);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    registrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { empleado_id, tipo, ubicacion } = req.body;
                const ip_address = req.ip;
                const fichaje = yield fichajes_service_1.default.registrarFichaje(empleado_id, tipo, ubicacion, ip_address);
                res.status(201).json(fichaje);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.default = new FichajeController();
