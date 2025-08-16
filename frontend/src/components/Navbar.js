import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Task Manager</Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>Logout</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
