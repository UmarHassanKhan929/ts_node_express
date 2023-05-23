import { Request, Response, NextFunction } from 'express';
import Task from '../models/TaskModel.js';
import mongoose from 'mongoose';

const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      message: 'Tasks fetched',
      body: tasks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { task } = req.body;
    const newTask = await Task.create({ task });
    res.status(201).json({
      message: 'Task created',
      body: newTask
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { task, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { task, completed });
    res.status(200).json({
      message: 'Task updated',
      body: updatedTask
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
