import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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