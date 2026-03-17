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
const fichajes_model_1 = __importDefault(require("../models/fichajes.model"));
const sequelize_1 = require("sequelize");
class FichajesService {
    // Empleado: registrar fichaje
    registrarFichaje(empleado_id, tipo, ubicacion, ip_address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fichajes_model_1.default.create({
                empleado_id,
                tipo,
                fecha_hora: new Date(),
                ubicacion,
                ip_address
            });
        });
    }
    // Empleado: ver sus fichajes de hoy
    obtenerFichajesHoy(empleado_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const manana = new Date(hoy);
            manana.setDate(manana.getDate() + 1);
            return yield fichajes_model_1.default.findAll({
                where: {
                    empleado_id,
                    fecha_hora: { [sequelize_1.Op.between]: [hoy, manana] }
                },
                order: [['fecha_hora', 'ASC']]
            });
        });
    }
    // Empleado: ver sus fichajes por rango de fechas
    obtenerFichajesPorFechas(empleado_id, fecha_inicio, fecha_fin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fichajes_model_1.default.findAll({
                where: {
                    empleado_id,
                    fecha_hora: { [sequelize_1.Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)] }
                },
                order: [['fecha_hora', 'ASC']]
            });
        });
    }
    // Admin: ver fichajes de todos los empleados
    listarTodosFichajes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fichajes_model_1.default.findAll({ order: [['fecha_hora', 'DESC']] });
        });
    }
    // Admin: ver fichajes de un empleado
    listarFichajesPorEmpleado(empleado_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fichajes_model_1.default.findAll({
                where: { empleado_id },
                order: [['fecha_hora', 'DESC']]
            });
        });
    }
}
exports.default = new FichajesService();
