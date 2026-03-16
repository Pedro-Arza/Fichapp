import Turno from '../models/turnos.model';

class TurnoService {

    // Admin: listar turnos
    async listarTurnos() {
        return await Turno.findAll();
    }

    // Admin: obtener turno por id
    async obtenerTurnoPorId(id: string) {
        const turno = await Turno.findByPk(id);
        if (!turno) throw new Error('Turno no encontrado');
        return turno;
    }

    // Admin: crear turno
    async crearTurno(datos: any) {
        return await Turno.create(datos);
    }

    // Admin: actualizar turno
    async actualizarTurno(id: string, datos: any) {
        const turno = await Turno.findByPk(id);
        if (!turno) throw new Error('Turno no encontrado');
        return await turno.update(datos);
    }

    // Admin: eliminar turno
    async eliminarTurno(id: string) {
        const turno = await Turno.findByPk(id);
        if (!turno) throw new Error('Turno no encontrado');
        await turno.destroy();
        return { mensaje: 'Turno eliminado correctamente' };
    }
}

export default new TurnoService();