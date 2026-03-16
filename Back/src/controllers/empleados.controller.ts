import { Request, Response } from 'express';
import EmpleadoService from '../service/empleados.service';

class EmpleadoController {

    async listar(req: Request, res: Response) {
        try {
            const empleados = await EmpleadoService.listarEmpleados();
            res.json(empleados);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPorId(req: Request, res: Response) {
        try {
            const empleado = await EmpleadoService.obtenerEmpleadoPorId(req.params.id as string);
            if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
            res.json(empleado);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async crear(req: Request, res: Response) {
        try {
            const empleado = await EmpleadoService.crearEmpleado(req.body);
            res.status(201).json(empleado);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async actualizar(req: Request, res: Response) {
        try {
            const empleado = await EmpleadoService.actualizarEmpleado(req.params.id as string, req.body);
            res.json(empleado);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async eliminar(req: Request, res: Response) {
        try {
            const resultado = await EmpleadoService.eliminarEmpleado(req.params.id as string);
            res.json(resultado);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPerfil(req: Request, res: Response) {
        try {
            const perfil = await EmpleadoService.obtenerPerfil(req.params.id as string);
            res.json(perfil);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new EmpleadoController();