import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//layouts
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

//route auth
import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";
import Home from "../../features/dashboard/pages/Home";
import ForgotPassword from "../../features/auth/pages/ForgotPassword";
import AuthorProfile from "../../features/auth/pages/AuthorProfile";
export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path= "/forgotpassword" element = {<ForgotPassword />} />
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Home />} />
                     <Route path="profile" element={<AuthorProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}