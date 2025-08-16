import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    onAdd(form);
    setForm({ title: "", description: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, mt: 2 }}>
      <TextField label="Title" name="title" value={form.title} onChange={handleChange} />
      <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
      <Button type="submit" variant="contained">Add</Button>
    </Box>
  );
}
