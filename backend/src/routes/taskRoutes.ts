import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All task routes are protected
router.use(authMiddleware);

router.get('/', (req, res, next) => taskController.getTasks(req, res, next));
router.post('/', (req, res, next) => taskController.createTask(req, res, next));
router.patch('/:id', (req, res, next) => taskController.updateTask(req, res, next));
router.delete('/:id', (req, res, next) => taskController.deleteTask(req, res, next));
router.patch('/:id/toggle', (req, res, next) => taskController.toggleTaskStatus(req, res, next));

export default router;
