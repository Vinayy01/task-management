import { Request } from 'express';

export interface AuthRequest extends Request {
    userId?: string;
}

export interface TokenPayload {
    userId: string;
}

export interface PaginationQuery {
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
}
