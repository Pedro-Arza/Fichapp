import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Fichaje = sequelize.define('Fichajes', {
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
            'entrada',
            'salida_comida',
            'vuelta_comida',
            'inicio_descanso',
            'fin_descanso',
            'salida'
        ),
        allowNull: false
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    notas: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'Fichajes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default Fichaje;