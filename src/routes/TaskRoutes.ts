import express from 'express';
import TaskController from '../controllers/TaskController.js';
import { validateAddTask, validateUpdateTask } from '../middlewares/TaskValidation.js';

const router = express.Router();

router.get('/get', TaskController.getTasks);
router.post('/create', validateAddTask, TaskController.createTask);
router.delete('/delete/:id', TaskController.deleteTask);
router.put('/update/:id', validateUpdateTask, TaskController.updateTask);

export default router;
