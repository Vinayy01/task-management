export interface User {
    id: string;
    email: string;
}

export interface Task {
    id: string;
    title: string;
    description: string | null;
    status: 'pending' | 'completed';
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface AuthResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface TasksResponse {
    tasks: Task[];
    pagination: Pagination;
}

export interface TaskFormData {
    title: string;
    description: string;
}
