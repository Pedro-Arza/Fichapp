import { Router } from 'express';
import TurnoController from '../controllers/turnos.controller';

const router = Router();

router.get('/', TurnoController.listar);
router.get('/:id', TurnoController.obtenerPorId);
router.post('/', TurnoController.crear);
router.put('/:id', TurnoController.actualizar);
router.delete('/:id', TurnoController.eliminar);

export default router;