import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { SignIn } from "../pages/SingIn";
import { Painel } from "../pages/Painel";
import { Home } from "../pages/Home";

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/painel" /> : <SignIn />} 
        />
        <Route 
          path="/painel" 
          element={user ? <Painel /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
