import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';

import ausenciasRoutes from './routes/ausencias.routes';
import empleadosRoutes from './routes/empleados.routes';
import fichajesRoutes from './routes/fichajes.routes';
import departamentosRoutes from './routes/departamento.routes';
import turnosRoutes from './routes/turnos.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/ausencias', ausenciasRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/fichajes', fichajesRoutes);
app.use('/api/departamentos', departamentosRoutes);
app.use('/api/turnos', turnosRoutes);

// Conexión base de datos y arranque
sequelize.authenticate()
    .then(() => {
        console.log(' Conectado a la base de datos');
        app.listen(PORT, () => {
            console.log(` Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error: any) => {
        console.error(' Error al conectar a la base de datos:', error);
    });

export default app;