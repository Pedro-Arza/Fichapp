import { Router } from 'express';
import AusenciaController from '../controllers/ausencias.controller';

const router = Router();

router.get('/', AusenciaController.listarTodas);
router.get('/pendientes', AusenciaController.listarPendientes);
router.get('/empleado/:empleado_id', AusenciaController.listarPorEmpleado);
router.post('/', AusenciaController.solicitar);
router.put('/:id/aprobar', AusenciaController.aprobar);
router.put('/:id/rechazar', AusenciaController.rechazar);

export default router;