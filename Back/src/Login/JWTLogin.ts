import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secreto123';

export const generarToken = (payload: object): string => {
    return jwt.sign(payload, SECRET, { expiresIn: '8h' });
};

export const verificarToken = (token: string): any => {
    return jwt.verify(token, SECRET);
};