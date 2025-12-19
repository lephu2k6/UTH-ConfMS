import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendCode = () => {
    alert(`Đã gửi mã đến: ${email}`);
  };

  const handleConfirm = () => {
    console.log("Xác nhận:", email, otp);
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen w-full font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">

      {/* HEADER */}
      <header className="bg-white px-5 py-2.5 border-b border-gray-300 h-20 flex items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2qngGR0BYF1bjICOBcLj9Ud2CackBYmm7A&s"
          alt="UTH Logo"
          className="h-full max-w-[300px] object-contain"
        />
      </header>

      {/* MAIN */}
      <main
        className="flex-1 flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://portal.ut.edu.vn/images/1.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-teal-400/30"></div>

        {/* CONTAINER */}
        <div className="relative z-10 bg-white rounded-[30px] shadow-xl w-[760px] max-w-[95%] overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT - INFO */}
            <div className="hidden md:flex flex-col items-center justify-center bg-[#e0f2f1] p-8">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2qngGR0BYF1bjICOBcLj9Ud2CackBYmm7A&s"
                alt="UTH Logo"
                className="w-56 mb-6"
              />
              <p className="text-center text-[#2c5f68] font-semibold leading-relaxed">
                HỆ THỐNG QUẢN LÝ HỘI NGHỊ<br />
                TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI
              </p>
            </div>

            {/* RIGHT - FORM */}
            <div className="px-10 py-10 text-center">

              <h1 className="text-[28px] font-medium text-[#2c5f68] mb-1">
                Khôi phục mật khẩu
              </h1>

              <h2 className="text-[18px] font-bold uppercase text-[#c62828] mb-8">
                Hệ thống hội nghị
              </h2>

              <form className="space-y-4 text-left">

                {/* EMAIL */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@uth.edu.vn"
                      className="w-full px-3 py-2 pr-28 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                        focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      className="absolute right-1 top-1 bottom-1 px-3 text-sm rounded-md
                        bg-[#0e7c7b] text-white hover:bg-[#0a6362] transition"
                    >
                      Gửi mã
                    </button>
                  </div>
                </div>

                {/* OTP */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    Nhập mã OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Nhập mã xác nhận"
                    className="w-full px-3 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full py-2.5 mt-2 bg-[#0e7c7b] text-white text-sm uppercase rounded-md
                    shadow-md hover:bg-[#0a6362] transition"
                >
                  Xác nhận
                </button>
              </form>

              {/* FOOTER LINK */}
              <div className="mt-5 text-center text-[13px]">
                <Link to="/" className="text-blue-600 font-bold hover:underline">
                  Quay lại đăng nhập
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
