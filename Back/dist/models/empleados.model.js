"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Empleado = database_1.default.define('Empleados', {
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    foto_url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    departamento_id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: true
    },
    turno_id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: true
    },
    rol: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    fecha_ingreso: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM('activo', 'inactivo', 'suspendido'),
        defaultValue: 'activo'
    }
}, {
    tableName: 'Empleados',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = Empleado;
