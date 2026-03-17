"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentos_controller_1 = __importDefault(require("../controllers/departamentos.controller"));
const router = (0, express_1.Router)();
router.get('/', departamentos_controller_1.default.listar);
router.get('/:id', departamentos_controller_1.default.obtenerPorId);
router.post('/', departamentos_controller_1.default.crear);
router.put('/:id', departamentos_controller_1.default.actualizar);
router.delete('/:id', departamentos_controller_1.default.eliminar);
exports.default = router;
