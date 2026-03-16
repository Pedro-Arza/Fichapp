import Departamento from "../models/departamentos.model";

class DepartamentoService {
    // Admin: listar departamentos
    async listarDepartamentos() {
        return await Departamento.findAll();
    }

    // Admin: obtener departamento por id
    async obtenerDepartamentoPorId(id: string) {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) throw new Error('Departamento no encontrado');
        return departamento;
    }

    // Admin: crear departamento
    async crearDepartamento(datos: any) {
        return await Departamento.create(datos);
    }

    // Admin: actualizar departamento
    async actualizarDepartamento(id: string, datos: any) {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) throw new Error('Departamento no encontrado');
        return await departamento.update(datos);
    }

    // Admin: eliminar departamento
    async eliminarDepartamento(id: string) {
        const departamento = await Departamento.findByPk(id);
        if (!departamento) throw new Error('Departamento no encontrado');
        await departamento.destroy();
        return { mensaje: 'Departamento eliminado correctamente' };
    }
}

export default new DepartamentoService();