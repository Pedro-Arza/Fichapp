import { Request, Response } from 'express';
import DepartamentoService from '../service/departamento.service';

class DepartamentoController {

    async listar(req: Request, res: Response) {
        try {
            const departamentos = await DepartamentoService.listarDepartamentos();
            res.json(departamentos);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPorId(req: Request, res: Response) {
        try {
            const departamento = await DepartamentoService.obtenerDepartamentoPorId(req.params.id as string);
            res.json(departamento);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async crear(req: Request, res: Response) {
        try {
            const departamento = await DepartamentoService.crearDepartamento(req.body);
            res.status(201).json(departamento);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async actualizar(req: Request, res: Response) {
        try {
            const departamento = await DepartamentoService.actualizarDepartamento(req.params.id as string, req.body);
            res.json(departamento);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async eliminar(req: Request, res: Response) {
        try {
            const resultado = await DepartamentoService.eliminarDepartamento(req.params.id as string);
            res.json(resultado);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new DepartamentoController();