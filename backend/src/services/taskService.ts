import { AppError } from '../middleware/errorMiddleware';
import prisma from '../utils/prisma';

export class TaskService {
    // Get tasks with pagination, search, and filter
    async getTasks(
        userId: string,
        page: number = 1,
        limit: number = 10,
        search?: string,
        status?: string
    ) {
        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = { userId };

        if (search) {
            where.title = { contains: search, mode: 'insensitive' };
        }

        if (status && (status === 'pending' || status === 'completed')) {
            where.status = status;
        }

        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.task.count({ where }),
        ]);

        return {
            tasks,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Create a new task
    async createTask(userId: string, title: string, description?: string) {
        if (!title || title.trim().length === 0) {
            throw new AppError('Title is required', 400);
        }

        const task = await prisma.task.create({
            data: { title: title.trim(), description: description?.trim(), userId },
        });

        return task;
    }

    // Update a task
    async updateTask(taskId: string, userId: string, title?: string, description?: string) {
        // Verify task belongs to user
        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        if (task.userId !== userId) {
            throw new AppError('Not authorized to update this task', 403);
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description.trim();

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: updateData,
        });

        return updatedTask;
    }

    // Delete a task
    async deleteTask(taskId: string, userId: string) {
        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        if (task.userId !== userId) {
            throw new AppError('Not authorized to delete this task', 403);
        }

        await prisma.task.delete({ where: { id: taskId } });
    }

    // Toggle task status
    async toggleTaskStatus(taskId: string, userId: string) {
        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        if (task.userId !== userId) {
            throw new AppError('Not authorized to update this task', 403);
        }

        const newStatus = task.status === 'pending' ? 'completed' : 'pending';

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { status: newStatus },
        });

        return updatedTask;
    }
}

export const taskService = new TaskService();
