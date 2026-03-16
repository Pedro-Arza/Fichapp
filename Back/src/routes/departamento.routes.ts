import { Router } from 'express';
import DepartamentoController from '../controllers/departamentos.controller';

const router = Router();

router.get('/', DepartamentoController.listar);
router.get('/:id', DepartamentoController.obtenerPorId);
router.post('/', DepartamentoController.crear);
router.put('/:id', DepartamentoController.actualizar);
router.delete('/:id', DepartamentoController.eliminar);

export default router;