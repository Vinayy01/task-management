import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/authService';
import { AuthRequest } from '../types';

export class AuthController {
    // POST /api/auth/register
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            if (password.length < 6) {
                res.status(400).json({ message: 'Password must be at least 6 characters' });
                return;
            }

            const result = await authService.register(email, password);

            res.status(201).json({
                message: 'User registered successfully',
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/auth/login
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            const result = await authService.login(email, password);

            res.json({
                message: 'Login successful',
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/auth/refresh
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            const result = await authService.refresh(refreshToken);

            res.json({
                message: 'Token refreshed successfully',
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/auth/logout
    async logout(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId!;
            await authService.logout(userId);

            res.json({ message: 'Logged out successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();
