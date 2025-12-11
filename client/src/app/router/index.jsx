import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//route auth
import Login from "../../features/auth/pages/Login"
import Register from "../../features/auth/pages/Register";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}