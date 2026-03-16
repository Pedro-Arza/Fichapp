import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Turno = sequelize.define('Turnos', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horas_esperadas: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    dias_semana: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'Turnos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Turno;