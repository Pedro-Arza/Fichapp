import Fichaje from '../models/fichajes.model';
import { Op } from 'sequelize';

class FichajesService {

    // Empleado: registrar fichaje
    async registrarFichaje(empleado_id: string, tipo: string, ubicacion?: string, ip_address?: string) {
        return await Fichaje.create({
            empleado_id,
            tipo,
            fecha_hora: new Date(),
            ubicacion,
            ip_address
        });
    }

    // Empleado: ver sus fichajes de hoy
    async obtenerFichajesHoy(empleado_id: string) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const manana = new Date(hoy);
        manana.setDate(manana.getDate() + 1);

        return await Fichaje.findAll({
            where: {
                empleado_id,
                fecha_hora: { [Op.between]: [hoy, manana] }
            },
            order: [['fecha_hora', 'ASC']]
        });
    }

    // Empleado: ver sus fichajes por rango de fechas
    async obtenerFichajesPorFechas(empleado_id: string, fecha_inicio: string, fecha_fin: string) {
        return await Fichaje.findAll({
            where: {
                empleado_id,
                fecha_hora: { [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)] }
            },
            order: [['fecha_hora', 'ASC']]
        });
    }

    // Admin: ver fichajes de todos los empleados
    async listarTodosFichajes() {
        return await Fichaje.findAll({ order: [['fecha_hora', 'DESC']] });
    }

    // Admin: ver fichajes de un empleado
    async listarFichajesPorEmpleado(empleado_id: string) {
        return await Fichaje.findAll({
            where: { empleado_id },
            order: [['fecha_hora', 'DESC']]
        });
    }
}

export default new FichajesService();