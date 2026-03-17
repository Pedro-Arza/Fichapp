"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ausencias_controller_1 = __importDefault(require("../controllers/ausencias.controller"));
const router = (0, express_1.Router)();
router.get('/', ausencias_controller_1.default.listarTodas);
router.get('/pendientes', ausencias_controller_1.default.listarPendientes);
router.get('/empleado/:empleado_id', ausencias_controller_1.default.listarPorEmpleado);
router.post('/', ausencias_controller_1.default.solicitar);
router.put('/:id/aprobar', ausencias_controller_1.default.aprobar);
router.put('/:id/rechazar', ausencias_controller_1.default.rechazar);
exports.default = router;
