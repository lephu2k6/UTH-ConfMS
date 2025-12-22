import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../app/store/useAuthStore";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  
  const [status, setStatus] = useState("loading"); 
  const [message, setMessage] = useState("Hệ thống đang xác thực tài khoản...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
        verifyEmail(token)
        .then(() => {
          setStatus("success");
          setMessage("Xác thực thành công! Tài khoản của bạn đã sẵn sàng.");
          setTimeout(() => navigate("/"), 3000);
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.response?.data?.message || "Liên kết xác thực không hợp lệ hoặc đã hết hạn.");
        });
    } else {
      setStatus("error");
      setMessage("Thiếu mã xác thực (token). Vui lòng kiểm tra lại email.");
    }
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f0f4f8] font-sans">
      <div className="bg-white p-10 rounded-[30px] shadow-2xl text-center max-w-md w-[90%] border-t-8 border-[#0e7c7b]">
        <img 
          src="https://portal.ut.edu.vn/images/logo_full.png" 
          className="w-48 mx-auto mb-8" 
          alt="UTH Logo" 
        />
        
        <div className="mb-6">
          {status === "loading" && (
            <div className="animate-spin w-12 h-12 border-4 border-[#0e7c7b] border-t-transparent rounded-full mx-auto"></div>
          )}
          {status === "success" && (
            <div className="text-green-500 text-6xl animate-bounce">✓</div>
          )}
          {status === "error" && (
            <div className="text-red-500 text-6xl">✕</div>
          )}
        </div>

        <h2 className={`text-2xl font-bold mb-4 ${status === "error" ? "text-red-600" : "text-[#2c5f68]"}`}>
          {status === "loading" ? "Đang xử lý" : status === "success" ? "Thành công!" : "Lỗi xác thực"}
        </h2>
        
        <p className="text-gray-600 leading-relaxed">
          {message}
        </p>

        {status !== "loading" && (
          <button 
            onClick={() => navigate("/")}
            className="mt-8 w-full bg-[#0e7c7b] hover:bg-[#0a5e5d] text-white py-2.5 rounded-lg font-bold transition duration-200"
          >
            Về trang đăng nhập
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;