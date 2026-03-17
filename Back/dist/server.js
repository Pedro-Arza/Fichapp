"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const ausencias_routes_1 = __importDefault(require("./routes/ausencias.routes"));
const empleados_routes_1 = __importDefault(require("./routes/empleados.routes"));
const fichajes_routes_1 = __importDefault(require("./routes/fichajes.routes"));
const departamento_routes_1 = __importDefault(require("./routes/departamento.routes"));
const turnos_routes_1 = __importDefault(require("./routes/turnos.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas
app.use('/api/auth', auth_routes_1.default);
app.use('/api/ausencias', ausencias_routes_1.default);
app.use('/api/empleados', empleados_routes_1.default);
app.use('/api/fichajes', fichajes_routes_1.default);
app.use('/api/departamentos', departamento_routes_1.default);
app.use('/api/turnos', turnos_routes_1.default);
// Conexión base de datos y arranque
database_1.default.authenticate()
    .then(() => {
    console.log(' Conectado a la base de datos');
    app.listen(PORT, () => {
        console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error(' Error al conectar a la base de datos:', error);
});
exports.default = app;
