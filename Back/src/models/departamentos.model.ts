import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Departamento = sequelize.define('Departamentos', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    responsable_id: {
        type: DataTypes.CHAR(36),
        allowNull: true
    }
}, {
    tableName: 'Departamentos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Departamento;