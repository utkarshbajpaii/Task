import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.items || []);
  };

  const addTask = async (task) => {
    await api.post("/tasks", task);
    fetchTasks();
  };

  const updateTask = async (id, updates) => {
    await api.patch(`/tasks/${id}`, updates);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
      </Box>
    </Container>
  );
}
