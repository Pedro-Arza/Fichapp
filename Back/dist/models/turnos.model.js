"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Turno = database_1.default.define('Turnos', {
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    hora_inicio: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    horas_esperadas: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    dias_semana: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'Turnos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = Turno;
