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
const turnos_model_1 = __importDefault(require("../models/turnos.model"));
class TurnoService {
    // Admin: listar turnos
    listarTurnos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield turnos_model_1.default.findAll();
        });
    }
    // Admin: obtener turno por id
    obtenerTurnoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turno = yield turnos_model_1.default.findByPk(id);
            if (!turno)
                throw new Error('Turno no encontrado');
            return turno;
        });
    }
    // Admin: crear turno
    crearTurno(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield turnos_model_1.default.create(datos);
        });
    }
    // Admin: actualizar turno
    actualizarTurno(id, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const turno = yield turnos_model_1.default.findByPk(id);
            if (!turno)
                throw new Error('Turno no encontrado');
            return yield turno.update(datos);
        });
    }
    // Admin: eliminar turno
    eliminarTurno(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turno = yield turnos_model_1.default.findByPk(id);
            if (!turno)
                throw new Error('Turno no encontrado');
            yield turno.destroy();
            return { mensaje: 'Turno eliminado correctamente' };
        });
    }
}
exports.default = new TurnoService();
