import { asyncHandler } from "../utils/asyncHandler.js";
import Task from "../models/Task.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    status,
    dueDate
  });
  res.status(201).json(task);
});

export const getTasks = asyncHandler(async (req, res) => {
  const { status, q, page = 1, limit = 10 } = req.query;
  const filter = { user: req.user._id };
  if (status) filter.status = status;
  if (q) filter.title = { $regex: q, $options: "i" };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Task.countDocuments(filter)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});
