import { Router } from 'express';
import EmpleadoController from '../controllers/empleados.controller';

const router = Router();

router.get('/', EmpleadoController.listar);
router.get('/:id', EmpleadoController.obtenerPorId);
router.get('/:id/perfil', EmpleadoController.obtenerPerfil);
router.post('/', EmpleadoController.crear);
router.put('/:id', EmpleadoController.actualizar);
router.delete('/:id', EmpleadoController.eliminar);

export default router;