import React, { useState } from 'react';
//import './Login.css'; // Nhớ import file CSS vừa tạo

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập tại đây
    console.log('Đăng nhập với:', username, password);
  };

  return (
    <div className="flex flex-col h-screen w-full font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">

  {/* Header */}
  <header className="bg-white px-5 py-2.5 border-b border-gray-300 h-20 flex items-center">
    <img
      src="https://portal.ut.edu.vn/images/logo_full.png"
      alt="Logo"
      className="h-full max-w-[300px] object-contain"
    />
  </header>

  {/* Main Content */}
  <main
    className="flex-1 flex items-center justify-center relative bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://portal.ut.edu.vn/images/1.jpg')",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-teal-400/30"></div>

    {/* Login Box */}
    <div className="relative z-10 bg-white px-10 py-8 rounded-[29px] shadow-lg w-[376px] text-center">

      <h1 className="text-[28px] font-medium text-[#2c5f68] mb-1">
        Đăng nhập
      </h1>

      <h2 className="text-[18px] font-bold uppercase text-[#c62828] mb-6">
        Hệ thống hội nghị
      </h2>

      {/* Username */}
      <div className="mb-4 text-left">
        <label className="block text-[13px] font-semibold text-gray-600 mb-1">
          Tên đăng nhập
        </label>
        <input
          type="text"
          className="w-full px-2.5 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
        />
      </div>

      {/* Password */}
      <div className="mb-4 text-left">
        <label className="block text-[13px] font-semibold text-gray-600 mb-1">
          Mật khẩu
        </label>
        <input
          type="password"
          className="w-full px-2.5 py-2 text-sm border border-[#7c99a0] rounded-md outline-none shadow-inner focus:border-[#00796b] focus:ring-2 focus:ring-[#00796b]/30"
        />
      </div>

      {/* Button */}
      <button className="w-full py-2 mt-2 bg-[#0e7c7b] text-white text-sm uppercase rounded-md shadow-md hover:bg-[#0a6362] transition">
        Đăng nhập
      </button>

      {/* Footer Links */}
      <div className="mt-4 flex flex-col gap-1 text-[13px]">
        <a href="#" className="text-blue-600 font-bold hover:underline">
          Đăng ký tài khoản
        </a>
        <a href="#" className="text-[#c62828] font-bold hover:underline">
          Quên mật khẩu?
        </a>
      </div>

    </div>
  </main>
</div>

  );
};

export default Login;