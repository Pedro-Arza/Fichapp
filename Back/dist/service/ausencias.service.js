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
const ausencias_model_1 = __importDefault(require("../models/ausencias.model"));
class AusenciaService {
    // Empleado: solicitar ausencia
    solicitarAusencia(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            if (new Date(datos.fecha_inicio) > new Date(datos.fecha_fin)) {
                throw new Error('La fecha de inicio no puede ser mayor que la fecha fin');
            }
            return yield ausencias_model_1.default.create(Object.assign(Object.assign({}, datos), { estado: 'pendiente' }));
        });
    }
    // Empleado: ver sus ausencias
    listarAusenciasPorEmpleado(empleado_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ausencias_model_1.default.findAll({ where: { empleado_id } });
        });
    }
    // Admin: listar todas las ausencias
    listarTodasAusencias() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ausencias_model_1.default.findAll();
        });
    }
    // Admin: listar ausencias pendientes
    listarPendientes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ausencias_model_1.default.findAll({ where: { estado: 'pendiente' } });
        });
    }
    // Admin: aprobar ausencia
    aprobarAusencia(id, aprobado_por, notas) {
        return __awaiter(this, void 0, void 0, function* () {
            const ausencia = yield ausencias_model_1.default.findByPk(id);
            if (!ausencia)
                throw new Error('Ausencia no encontrada');
            if (ausencia.getDataValue('estado') !== 'pendiente') {
                throw new Error('Solo se pueden aprobar ausencias pendientes');
            }
            return yield ausencia.update({
                estado: 'aprobada',
                aprobado_por,
                notas_aprobacion: notas,
                fecha_aprobacion: new Date()
            });
        });
    }
    // Admin: rechazar ausencia
    rechazarAusencia(id, aprobado_por, notas) {
        return __awaiter(this, void 0, void 0, function* () {
            const ausencia = yield ausencias_model_1.default.findByPk(id);
            if (!ausencia)
                throw new Error('Ausencia no encontrada');
            if (ausencia.getDataValue('estado') !== 'pendiente') {
                throw new Error('Solo se pueden rechazar ausencias pendientes');
            }
            return yield ausencia.update({
                estado: 'rechazada',
                aprobado_por,
                notas_aprobacion: notas,
                fecha_aprobacion: new Date()
            });
        });
    }
}
exports.default = new AusenciaService();
