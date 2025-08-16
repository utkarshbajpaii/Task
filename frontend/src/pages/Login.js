import { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields required");
      return;
    }
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} margin="normal" />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
}
