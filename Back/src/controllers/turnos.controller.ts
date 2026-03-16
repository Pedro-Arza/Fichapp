import { Request, Response } from 'express';
import TurnoService from '../service/turnos.service';

class TurnoController {

    async listar(req: Request, res: Response) {
        try {
            const turnos = await TurnoService.listarTurnos();
            res.json(turnos);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPorId(req: Request, res: Response) {
        try {
            const turno = await TurnoService.obtenerTurnoPorId(req.params.id as string);
            res.json(turno);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async crear(req: Request, res: Response) {
        try {
            const turno = await TurnoService.crearTurno(req.body);
            res.status(201).json(turno);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async actualizar(req: Request, res: Response) {
        try {
            const turno = await TurnoService.actualizarTurno(req.params.id as string, req.body);
            res.json(turno);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async eliminar(req: Request, res: Response) {
        try {
            const resultado = await TurnoService.eliminarTurno(req.params.id as string);
            res.json(resultado);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TurnoController();