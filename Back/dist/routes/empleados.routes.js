"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleados_controller_1 = __importDefault(require("../controllers/empleados.controller"));
const router = (0, express_1.Router)();
router.get('/', empleados_controller_1.default.listar);
router.get('/:id', empleados_controller_1.default.obtenerPorId);
router.get('/:id/perfil', empleados_controller_1.default.obtenerPerfil);
router.post('/', empleados_controller_1.default.crear);
router.put('/:id', empleados_controller_1.default.actualizar);
router.delete('/:id', empleados_controller_1.default.eliminar);
exports.default = router;
