import { BrowserRouter, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import PublicLayout from "../../layouts/PublicLayout";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import ForgotPassword from "../../features/auth/pages/ForgotPassword";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<h2>Dashboard</h2>} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
=======
//layouts
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

//route auth
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import Home from "../../features/dashboard/pages/Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
>>>>>>> 3a9fe4b00686e3fd515db9bff9dd8d92d33fd8ed
