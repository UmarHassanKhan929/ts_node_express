import { Request, Response, NextFunction } from 'express';
import { object, string, boolean } from 'zod';

const taskSchema = object({
  task: string().nonempty(),
  completed: boolean().optional()
});

const taskUpdateSchema = object({
  task: string().nonempty().optional(),
  completed: boolean()
});

const validateAddTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    taskSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const validateUpdateTask = (req: Request, res: Response, next: NextFunction): void => {
  try {
    taskUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { validateAddTask, validateUpdateTask };
