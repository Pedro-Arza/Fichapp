import { Router } from 'express';
import FichajeController from '../controllers/fichajes.controller';

const router = Router();

router.get('/', FichajeController.listarTodos);
router.get('/empleado/:empleado_id', FichajeController.listarPorEmpleado);
router.get('/empleado/:empleado_id/hoy', FichajeController.obtenerHoy);
router.get('/empleado/:empleado_id/fechas', FichajeController.obtenerPorFechas);
router.post('/', FichajeController.registrar);
router.put('/:id', FichajeController.actualizar);
router.delete('/:id', FichajeController.eliminar);

export default router;