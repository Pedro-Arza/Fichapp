import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Empleado = sequelize.define('Empleados', {
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nombre_completo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    foto_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    departamento_id: {
        type: DataTypes.CHAR(36),
        allowNull: true
    },
    turno_id: {
        type: DataTypes.CHAR(36),
        allowNull: true
    },
    rol: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    fecha_ingreso: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'suspendido'),
        defaultValue: 'activo'
    }
}, {
    tableName: 'Empleados',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Empleado;