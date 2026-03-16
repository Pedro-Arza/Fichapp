const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ausencia = sequelize.define('Ausencias', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    empleado_id: {
        type: DataTypes.CHAR(36),
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM(
            'vacaciones',
            'baja_medica',
            'permiso',
            'ausencia_justificada',
            'ausencia_injustificada',
            'teletrabajo'
        ),
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    motivo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
        defaultValue: 'pendiente'
    },
    aprobado_por: {
        type: DataTypes.CHAR(36),
        allowNull: true
    },
    fecha_aprobacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    notas_aprobacion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Ausencias',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Ausencia;