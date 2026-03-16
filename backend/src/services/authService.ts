import bcrypt from 'bcryptjs';
import { AppError } from '../middleware/errorMiddleware';
import prisma from '../utils/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token';

export class AuthService {
    // Register a new user
    async register(email: string, password: string) {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new AppError('User with this email already exists', 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        // Generate tokens
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        // Store refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        return {
            user: { id: user.id, email: user.email },
            accessToken,
            refreshToken,
        };
    }

    // Login user
    async login(email: string, password: string) {
        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        // Generate tokens
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        // Store refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        return {
            user: { id: user.id, email: user.email },
            accessToken,
            refreshToken,
        };
    }

    // Refresh access token
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new AppError('Refresh token is required', 400);
        }

        // Verify the refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Check if user exists and token matches
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user || user.refreshToken !== refreshToken) {
            throw new AppError('Invalid refresh token', 401);
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        // Update stored refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    // Logout user
    async logout(userId: string) {
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
    }
}

export const authService = new AuthService();
