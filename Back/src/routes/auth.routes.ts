import { Router, Request, Response } from 'express';
import UsuarioService from '../service/usuario.service';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const resultado = await UsuarioService.login(email, password);
        res.json(resultado);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

export default router;