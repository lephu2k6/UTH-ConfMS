import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../app/store/useAuthStore";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { forgotPassword, isLoading } = useAuthStore();

  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Link khôi phục mật khẩu đã được gửi vào Email của bạn!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Email không tồn tại trong hệ thống");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans">
      
      {/* HEADER */}
      <header className="bg-white px-5 py-2.5 border-b border-gray-300 h-20 flex items-center">
        <img
          src="https://portal.ut.edu.vn/images/logo_full.png"
          alt="UTH Logo"
          className="h-full max-w-[300px] object-contain"
        />
      </header>

      {/* MAIN */}
      <main
        className="flex-1 flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://portal.ut.edu.vn/images/1.jpg')" }}
      >
        {/* Overlay xanh đặc trưng */}
        <div className="absolute inset-0 bg-teal-400/30"></div>

        {/* CONTAINER */}
        <div className="relative z-10 bg-white rounded-[30px] shadow-2xl w-[760px] max-w-[95%] overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT - INFO PANEL */}
            <div className="hidden md:flex flex-col items-center justify-center bg-[#e0f2f1] p-8">
              <img
                src="https://portal.ut.edu.vn/images/logo_full.png"
                alt="UTH Logo"
                className="w-56 mb-6"
              />
              <p className="text-center text-[#2c5f68] font-bold leading-relaxed uppercase tracking-wider">
                Hệ thống quản lý hội nghị<br />
                Đại học Giao thông vận tải TP.HCM
              </p>
            </div>

            {/* RIGHT - FORM PANEL */}
            <div className="px-10 py-12 text-center">
              
              <h1 className="text-[28px] font-medium text-[#2c5f68] mb-1">
                Khôi phục mật khẩu
              </h1>
              
              <h2 className="text-[18px] font-bold uppercase text-[#c62828] mb-8">
                Hệ thống hội nghị
              </h2>

              <form onSubmit={handleSendRequest} className="space-y-6 text-left">
                
                {/* EMAIL INPUT */}
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-semibold text-gray-600 ml-1">
                    Nhập Email đăng ký
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email của bạn"
                    className="w-full px-4 py-2.5 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30 transition-all"
                    required
                  />
                  
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#0e7c7b] text-white text-sm font-bold uppercase rounded-md
                    shadow-md hover:bg-[#0a6362] active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {isLoading ? "Đang xử lý..." : "Gửi yêu cầu khôi phục"}
                </button>

              </form>

              {/* FOOTER LINK */}
              <div className="mt-8 text-center">
                <Link to="/" className="text-blue-600 font-bold text-[13px] hover:underline flex items-center justify-center gap-2">
                  <span>←</span> Quay lại đăng nhập
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;