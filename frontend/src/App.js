import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
         <Route
           path="/"
           element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
           path="/dashboard"
           element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
       </Routes>
     </AuthProvider>
    </Router>
  );
}
