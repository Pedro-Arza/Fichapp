import Empleado from '../models/empleados.model';

class EmpleadoService {

    // Admin: listar todos los empleados
    async listarEmpleados() {
        return await Empleado.findAll();
    }

    // Admin: obtener empleado por id
    async obtenerEmpleadoPorId(id: string) {
        return await Empleado.findByPk(id);
    }

    // Admin: crear empleado
    async crearEmpleado(datos: any) {
        return await Empleado.create(datos);
    }

    // Admin: actualizar empleado
    async actualizarEmpleado(id: string, datos: any) {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) throw new Error('Empleado no encontrado');
        return await empleado.update(datos);
    }

    // Admin: eliminar empleado
    async eliminarEmpleado(id: string) {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) throw new Error('Empleado no encontrado');
        await empleado.destroy();
        return { mensaje: 'Empleado eliminado correctamente' };
    }

    // Empleado: ver su perfil
    async obtenerPerfil(id: string) {
        return await Empleado.findByPk(id, {
            attributes: { exclude: ['password_hash'] }
        });
    }
}

export default new EmpleadoService();