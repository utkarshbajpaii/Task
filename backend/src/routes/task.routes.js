import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();

router.use(protectRoute);                  // Protect all task routes

router.route("/")
  .get(getTasks)                           // Read (list)
  .post(createTask);                       // Create

router.route("/:id")
  .get(getTaskById)                        // Read (single)
  .patch(updateTask)                       // Update (partial)
  .delete(deleteTask);                     // Delete

export default router;
