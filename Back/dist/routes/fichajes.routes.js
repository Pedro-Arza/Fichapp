"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fichajes_controller_1 = __importDefault(require("../controllers/fichajes.controller"));
const router = (0, express_1.Router)();
router.get('/', fichajes_controller_1.default.listarTodos);
router.get('/empleado/:empleado_id', fichajes_controller_1.default.listarPorEmpleado);
router.get('/empleado/:empleado_id/hoy', fichajes_controller_1.default.obtenerHoy);
router.get('/empleado/:empleado_id/fechas', fichajes_controller_1.default.obtenerPorFechas);
router.post('/', fichajes_controller_1.default.registrar);
router.put('/:id', fichajes_controller_1.default.actualizar);
router.delete('/:id', fichajes_controller_1.default.eliminar);
exports.default = router;
