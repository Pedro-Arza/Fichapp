"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Fichaje = database_1.default.define('Fichajes', {
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    empleado_id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false
    },
    tipo: {
        type: sequelize_1.DataTypes.ENUM('entrada', 'salida_comida', 'vuelta_comida', 'inicio_descanso', 'fin_descanso', 'salida'),
        allowNull: false
    },
    fecha_hora: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    ubicacion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    notas: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    ip_address: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'Fichajes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});
exports.default = Fichaje;
