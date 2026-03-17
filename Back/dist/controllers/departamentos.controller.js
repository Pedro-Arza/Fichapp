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
const departamento_service_1 = __importDefault(require("../service/departamento.service"));
class DepartamentoController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departamentos = yield departamento_service_1.default.listarDepartamentos();
                res.json(departamentos);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    obtenerPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departamento = yield departamento_service_1.default.obtenerDepartamentoPorId(req.params.id);
                res.json(departamento);
            }
            catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departamento = yield departamento_service_1.default.crearDepartamento(req.body);
                res.status(201).json(departamento);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departamento = yield departamento_service_1.default.actualizarDepartamento(req.params.id, req.body);
                res.json(departamento);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield departamento_service_1.default.eliminarDepartamento(req.params.id);
                res.json(resultado);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new DepartamentoController();
