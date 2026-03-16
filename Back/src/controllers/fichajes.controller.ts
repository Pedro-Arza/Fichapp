import { Request, Response } from 'express';
import FichajeService from '../service/fichajes.service';

class FichajeController {
    eliminar(arg0: string, eliminar: any) {
        throw new Error('Method not implemented.');
    }
    actualizar(arg0: string, actualizar: any) {
        throw new Error('Method not implemented.');
    }

    async listarTodos(req: Request, res: Response) {
        try {
            const fichajes = await FichajeService.listarTodosFichajes();
            res.json(fichajes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarPorEmpleado(req: Request, res: Response) {
        try {
            const fichajes = await FichajeService.listarFichajesPorEmpleado(req.params.empleado_id as string);
            res.json(fichajes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerHoy(req: Request, res: Response) {
        try {
            const fichajes = await FichajeService.obtenerFichajesHoy(req.params.empleado_id as string);
            res.json(fichajes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPorFechas(req: Request, res: Response) {
        try {
            const { fecha_inicio, fecha_fin } = req.query;
            const fichajes = await FichajeService.obtenerFichajesPorFechas(
                req.params.empleado_id as string,
                fecha_inicio as string,
                fecha_fin as string
            );
            res.json(fichajes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async registrar(req: Request, res: Response) {
        try {
            const { empleado_id, tipo, ubicacion } = req.body;
            const ip_address = req.ip;
            const fichaje = await FichajeService.registrarFichaje(empleado_id, tipo, ubicacion, ip_address);
            res.status(201).json(fichaje);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new FichajeController();