import { NextFunction, Response } from 'express';
import { taskService } from '../services/taskService';
import { AuthRequest, PaginationQuery } from '../types';

export class TaskController {
    // GET /api/tasks
    async getTasks(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId!;
            const { page, limit, search, status } = req.query as PaginationQuery;

            const result = await taskService.getTasks(
                userId,
                page ? parseInt(page) : 1,
                limit ? parseInt(limit) : 10,
                search,
                status
            );

            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    // POST /api/tasks
    async createTask(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId!;
            const { title, description } = req.body;

            const task = await taskService.createTask(userId, title, description);

            res.status(201).json({
                message: 'Task created successfully',
                task,
            });
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/tasks/:id
    async updateTask(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId!;
            const id = req.params.id as string;
            const { title, description } = req.body;

            const task = await taskService.updateTask(id, userId, title, description);

            res.json({
                message: 'Task updated successfully',
                task,
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/tasks/:id
    async deleteTask(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId!;
            const id = req.params.id as string;

            await taskService.deleteTask(id, userId);

            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/tasks/:id/toggle
    async toggleTaskStatus(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.userId!;
            const id = req.params.id as string;

            const task = await taskService.toggleTaskStatus(id, userId);

            res.json({
                message: 'Task status toggled successfully',
                task,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const taskController = new TaskController();
