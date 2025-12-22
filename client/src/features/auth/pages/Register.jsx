import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../app/store/useAuthStore";
import Header from "../../../components/Header";

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // 1. Khai báo state khớp hoàn toàn với key của Backend
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // 2. Lấy hàm và trạng thái từ AuthStore
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);

  // 3. Hàm xử lý thay đổi input dùng chung
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // 4. Hàm xử lý gửi dữ liệu đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();

    // Kiểm tra khớp mật khẩu ở phía Client (UX)
    if (formData.password !== formData.password_confirmation) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // Gửi body đúng định dạng Backend yêu cầu
      await signup({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });

      alert("Đăng ký thành công!");
      navigate("/"); // Chuyển hướng về trang đăng nhập
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response?.data);
      const serverMessage = error.response?.data?.message || "Đăng ký thất bại, vui lòng kiểm tra lại!";
      alert(serverMessage);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans">
      <Header />

      <main
        className="flex-1 flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://portal.ut.edu.vn/images/1.jpg')" }}
      >
        {/* Lớp phủ xanh đặc trưng của UTH */}
        <div className="absolute inset-0 bg-teal-400/30"></div>

        <div className="relative z-10 bg-white rounded-[30px] shadow-xl w-[760px] max-w-[95%] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* PHẦN TRÁI: LOGO & GIỚI THIỆU */}
            <div className="hidden md:flex flex-col items-center justify-center bg-[#e0f2f1] p-8">
              <img
                src="https://portal.ut.edu.vn/images/logo_full.png"
                alt="UTH Logo"
                className="w-56 mb-6"
              />
              <p className="text-center text-[#2c5f68] font-bold uppercase leading-relaxed">
                Hệ thống quản lý giấy tờ Hội nghị <br />
                Trường Đại học UTH (UTH-ConfMS)
              </p>
            </div>

            {/* PHẦN PHẢI: FORM ĐĂNG KÝ */}
            <div className="px-10 py-10">
              <h1 className="text-[28px] font-bold text-[#2c5f68] mb-6 text-center">
                Đăng ký tài khoản
              </h1>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Họ và tên - map vào full_name */}
                <div>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Họ và tên"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email của bạn"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                {/* Mật khẩu */}
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                {/* Xác nhận mật khẩu - map vào password_confirmation */}
                <div>
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Xác nhận mật khẩu"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0e7c7b] hover:bg-[#0a5e5d] text-white py-2.5 rounded transition duration-200 disabled:opacity-60 font-bold uppercase"
                >
                  {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <Link to="/" className="text-blue-600 font-bold hover:underline">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;