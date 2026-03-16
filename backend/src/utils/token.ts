import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenPayload } from '../types';

export const generateAccessToken = (userId: string): string => {
    const options: SignOptions = {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || '15m') as any,
    };
    return jwt.sign(
        { userId } as TokenPayload,
        process.env.ACCESS_TOKEN_SECRET as string,
        options
    );
};

export const generateRefreshToken = (userId: string): string => {
    const options: SignOptions = {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || '7d') as any,
    };
    return jwt.sign(
        { userId } as TokenPayload,
        process.env.REFRESH_TOKEN_SECRET as string,
        options
    );
};

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload;
};
