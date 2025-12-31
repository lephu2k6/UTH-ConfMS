import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuthStore } from "../../../app/store/useAuthStore";
import Header from "../../../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    // Gọi action login từ store
    const user = await login({
      email: email.trim(),
      password: password
    });

    if (user) {
      const role = user.role_names?.[0]; 
      
      // Điều hướng dựa trên role
      if (role === "ADMIN") {
        navigate("/admin/conferences");
      } else if (role === "CHAIR") {
        navigate("/chair/submissions");
      } else {
        navigate("/dashboard"); 
      }
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Sai tài khoản hoặc mật khẩu";
    console.error("Lỗi đăng nhập:", errorMsg);
    alert(errorMsg);
  }
};

  return (
    <div className="flex flex-col h-screen w-full font-sans">
      <Header />

      <main
        className="flex-1 flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://portal.ut.edu.vn/images/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-teal-400/30"></div>

        <div className="relative z-10 bg-white rounded-[30px] shadow-xl w-[760px] max-w-[95%] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            <div className="hidden md:flex flex-col items-center justify-center bg-[#e0f2f1] p-8">
              <img
                src="https://portal.ut.edu.vn/images/logo_full.png"
                className="w-56 mb-6"
                alt="Logo"
              />
              <p className="text-center text-[#2c5f68] font-semibold uppercase">
                Hệ thống quản lý giấy tờ Hội nghị <br />
                Trường Đại học UTH (UTH-ConfMS)
              </p>
            </div>

            <div className="px-10 py-10">
              <h1 className="text-[28px] text-[#2c5f68] mb-6 text-center font-bold">
                Đăng nhập
              </h1>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0e7c7b] hover:bg-[#0a5e5d] text-white py-2.5 rounded transition duration-200 disabled:opacity-60 font-bold"
                >
                  {isLoading ? "Đang xác thực..." : "Đăng nhập"}
                </button>
              </form>

              <div className="mt-6 text-sm text-center">
                <Link to="/register" className="text-blue-600 hover:underline">Đăng ký tài khoản</Link>
                <span className="mx-2 text-gray-400">|</span>
                <Link to="/forgotpassword" className="text-red-600 hover:underline">Quên mật khẩu?</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;