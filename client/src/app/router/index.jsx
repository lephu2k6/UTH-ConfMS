import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//layouts
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuditLog from "../../features/dashboard/pages/auditLogs";

//route auth
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import Home from "../../features/dashboard/pages/Home";
import ForgotPassword from "../../features/auth/pages/ForgotPassword";
import AuthorProfile from "../../features/auth/pages/AuthorProfile";
import VerifyEmail from "../../features/auth/pages/VerifyEmail";
import ResetPasswordConfirm from "../../features/auth/pages/ResetPasswordConfirm";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPasswordConfirm />} />
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<AuthorProfile />} />
                    <Route path="audit-logs" element={<AuditLog />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}