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
const turnos_service_1 = __importDefault(require("../service/turnos.service"));
class TurnoController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turnos = yield turnos_service_1.default.listarTurnos();
                res.json(turnos);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    obtenerPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turno = yield turnos_service_1.default.obtenerTurnoPorId(req.params.id);
                res.json(turno);
            }
            catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turno = yield turnos_service_1.default.crearTurno(req.body);
                res.status(201).json(turno);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turno = yield turnos_service_1.default.actualizarTurno(req.params.id, req.body);
                res.json(turno);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield turnos_service_1.default.eliminarTurno(req.params.id);
                res.json(resultado);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new TurnoController();
