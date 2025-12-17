import React, { useState } from "react";
import { Link } from "react-router-dom";

const TEXT = {
  en: {
    title: "Register",
    subtitle: "Conference System",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    submit: "Create Account",
    login: "Already have an account? Sign In",
    en: "English",
    vi: "Vietnamese",
    description:
      "Conference Management System\nUniversity of Transport and Communications",
  },
  vi: {
    title: "Đăng ký",
    subtitle: "Hệ thống hội nghị",
    fullName: "Họ và tên",
    email: "Email",
    password: "Mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
    submit: "Tạo tài khoản",
    login: "Đã có tài khoản? Đăng nhập",
    en: "English",
    vi: "Tiếng Việt",
    description:
      "HỆ THỐNG QUẢN LÝ HỘI NGHỊ\nTRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI",
  },
};

const RegisterPage = () => {
  const [language, setLanguage] = useState("vi");
  const t = TEXT[language];

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

        {/* REGISTER CONTAINER */}
        <div className="relative z-10 bg-white rounded-[30px] shadow-xl w-[760px] max-w-[95%] overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT - LOGO / INFO */}
            <div className="hidden md:flex flex-col items-center justify-center bg-[#e0f2f1] p-8">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2qngGR0BYF1bjICOBcLj9Ud2CackBYmm7A&s"
                alt="UTH Logo"
                className="w-56 mb-6"
              />
              <p className="text-center text-[#2c5f68] font-semibold leading-relaxed whitespace-pre-line">
                {t.description}
              </p>
            </div>

            {/* RIGHT - REGISTER FORM */}
            <div className="px-10 py-10 text-center">

              <h1 className="text-[28px] font-medium text-[#2c5f68] mb-1">
                {t.title}
              </h1>

              <h2 className="text-[18px] font-bold uppercase text-[#c62828] mb-4">
                {t.subtitle}
              </h2>

              {/* Language Toggle */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    language === "en"
                      ? "bg-[#0e7c7b] text-white"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {t.en}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("vi")}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    language === "vi"
                      ? "bg-[#0e7c7b] text-white"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {t.vi}
                </button>
              </div>

              {/* FORM */}
              <form className="space-y-4 text-left">

                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyen Van A"
                    className="w-full px-3 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    placeholder="example@uth.edu.vn"
                    className="w-full px-3 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    {t.password}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    {t.confirmPassword}
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 bg-[#0e7c7b] text-white text-sm uppercase rounded-md
                    shadow-md hover:bg-[#0a6362] transition"
                >
                  {t.submit}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-5 text-center text-[13px]">
                <Link to="/login" className="text-blue-600 font-bold hover:underline">
                  {t.login}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
