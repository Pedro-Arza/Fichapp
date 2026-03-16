import { Request, Response } from 'express';
import AusenciaService from '../service/ausencias.service';

class AusenciaController {

    async listarTodas(req: Request, res: Response) {
        try {
            const ausencias = await AusenciaService.listarTodasAusencias();
            res.json(ausencias);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarPorEmpleado(req: Request, res: Response) {
        try {
            const ausencias = await AusenciaService.listarAusenciasPorEmpleado(req.params.empleado_id as string);
            res.json(ausencias);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarPendientes(req: Request, res: Response) {
        try {
            const ausencias = await AusenciaService.listarPendientes();
            res.json(ausencias);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async solicitar(req: Request, res: Response) {
        try {
            const ausencia = await AusenciaService.solicitarAusencia(req.body);
            res.status(201).json(ausencia);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async aprobar(req: Request, res: Response) {
        try {
            const { aprobado_por, notas } = req.body;
            const ausencia = await AusenciaService.aprobarAusencia(req.params.id as string, aprobado_por, notas);
            res.json(ausencia);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async rechazar(req: Request, res: Response) {
        try {
            const { aprobado_por, notas } = req.body;
            const ausencia = await AusenciaService.rechazarAusencia(req.params.id as string, aprobado_por, notas);
            res.json(ausencia);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new AusenciaController();