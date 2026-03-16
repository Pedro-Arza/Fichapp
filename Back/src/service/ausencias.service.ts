class AusenciaService {

    // Empleado: solicitar ausencia
    async solicitarAusencia(datos: any) {
        if (new Date(datos.fecha_inicio) > new Date(datos.fecha_fin)) {
            throw new Error('La fecha de inicio no puede ser mayor que la fecha fin');
        }
        return await Ausencia.create({ ...datos, estado: 'pendiente' });
    }

    // Empleado: ver sus ausencias
    async listarAusenciasPorEmpleado(empleado_id: string) {
        return await Ausencia.findAll({ where: { empleado_id } });
    }

    // Admin: listar todas las ausencias
    async listarTodasAusencias() {
        return await Ausencia.findAll();
    }

    // Admin: listar ausencias pendientes
    async listarPendientes() {
        return await Ausencia.findAll({ where: { estado: 'pendiente' } });
    }

    // Admin: aprobar ausencia
    async aprobarAusencia(id: string, aprobado_por: string, notas?: string) {
        const ausencia = await Ausencia.findByPk(id);
        if (!ausencia) throw new Error('Ausencia no encontrada');
        if (ausencia.getDataValue('estado') !== 'pendiente') {
            throw new Error('Solo se pueden aprobar ausencias pendientes');
        }
        return await ausencia.update({
            estado: 'aprobada',
            aprobado_por,
            notas_aprobacion: notas,
            fecha_aprobacion: new Date()
        });
    }

    // Admin: rechazar ausencia
    async rechazarAusencia(id: string, aprobado_por: string, notas?: string) {
        const ausencia = await Ausencia.findByPk(id);
        if (!ausencia) throw new Error('Ausencia no encontrada');
        if (ausencia.getDataValue('estado') !== 'pendiente') {
            throw new Error('Solo se pueden rechazar ausencias pendientes');
        }
        return await ausencia.update({
            estado: 'rechazada',
            aprobado_por,
            notas_aprobacion: notas,
            fecha_aprobacion: new Date()
        });
    }
}

export default new AusenciaService();