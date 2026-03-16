import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types';
import { verifyAccessToken } from '../utils/token';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Access token is required' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired access token' });
    }
};
