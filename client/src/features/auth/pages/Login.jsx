import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Đăng nhập với:', { username, password });
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

        {/* LOGIN CONTAINER */}
        <div className="relative z-10 bg-white rounded-[30px] shadow-xl w-[760px] max-w-[95%] overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT - LOGO / INFO */}
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

            {/* RIGHT - LOGIN FORM */}
            <div className="px-10 py-10 text-center">

              <h1 className="text-[28px] font-medium text-[#2c5f68] mb-1">
                Đăng nhập
              </h1>

              <h2 className="text-[18px] font-bold uppercase text-[#c62828] mb-8">
                Hệ thống hội nghị
              </h2>

              <form onSubmit={handleLogin}>

                {/* Username */}
                <div className="mb-4 text-left">
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    className="w-full px-3 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-5 text-left">
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-3 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner
                      focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
                    required
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0e7c7b] text-white text-sm uppercase rounded-md
                    shadow-md hover:bg-[#0a6362] transition"
                >
                  Đăng nhập
                </button>

              </form>

              {/* LINKS */}
              <div className="mt-5 flex flex-col gap-1 text-[13px]">
                <Link to="/register" className="text-blue-600 font-bold hover:underline">
                  Đăng ký tài khoản
                </Link>
                <Link to="/forgotpassword" className="text-[#c62828] font-bold hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
