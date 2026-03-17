import Empleado from '../models/empleados.model';
import { generarToken } from '../Login/JWTLogin';
import crypto from 'crypto';

class UsuarioService {

    async login(email: string, password: string) {
        const password_hash = crypto.createHash('md5').update(password).digest('hex');

        const empleado = await Empleado.findOne({
            where: { email, password_hash },
            attributes: { exclude: ['password_hash'] }
        });

        if (!empleado) throw new Error('Credenciales incorrectas');

        const token = generarToken({
            id: empleado.getDataValue('id'),
            email: empleado.getDataValue('email'),
            rol: empleado.getDataValue('rol')
        });

        return { token, empleado };
    }
}

export default new UsuarioService();