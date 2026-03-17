"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnos_controller_1 = __importDefault(require("../controllers/turnos.controller"));
const router = (0, express_1.Router)();
router.get('/', turnos_controller_1.default.listar);
router.get('/:id', turnos_controller_1.default.obtenerPorId);
router.post('/', turnos_controller_1.default.crear);
router.put('/:id', turnos_controller_1.default.actualizar);
router.delete('/:id', turnos_controller_1.default.eliminar);
exports.default = router;
