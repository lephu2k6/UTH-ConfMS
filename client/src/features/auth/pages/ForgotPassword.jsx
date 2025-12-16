import React, { useState } from 'react';
import { Home, ArrowLeft } from 'lucide-react'; // Nếu bạn không có lucide-react, có thể dùng svg thường hoặc bỏ qua icon

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendCode = () => {
    alert(`Đã gửi mã đến: ${email}`);
  };

  const handleConfirm = () => {
    console.log('Xác nhận với:', email, otp);
  };

  return (
    <div className="flex flex-col min-h-screen w-full font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      
      {/* --- HEADER --- */}
      <header className="bg-white px-5 py-2 border-b border-gray-300 h-16 flex items-center justify-between shadow-sm z-20">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2qngGR0BYF1bjICOBcLj9Ud2CackBYmm7A&s" // Logo UTH
          alt="Logo UTH"
          className="h-full max-h-12 object-contain"
        />
        <div className="flex items-center gap-4">
            {/* Icon Home */}
            <button className="text-[#008689] hover:text-[#006a6c]">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </button>
            {/* Nút Đăng nhập trên header */}
            <button 
                onClick={onBackToLogin}
                className="bg-[#5bc0de] hover:bg-[#46b8da] text-white px-4 py-1.5 rounded text-sm font-medium transition"
            >
                Đăng nhập
            </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main
        className="flex-1 flex flex-col items-center justify-center relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://portal.ut.edu.vn/images/1.jpg')",
        }}
      >
        {/* Overlay màu xanh ngọc */}
        <div className="absolute inset-0 bg-[#008689]/80 mix-blend-multiply"></div> 
        <div className="absolute inset-0 bg-[#008689]/40"></div>

        {/* --- FORM CARD --- */}
        <div className="relative z-10 bg-white p-8 rounded-[20px] shadow-2xl w-[450px] max-w-[90%] text-center mt-10 mb-20">
          
          <h2 className="text-[24px] text-black font-medium mb-8">
            khôi phục mật khẩu
          </h2>

          {/* Input Email */}
          <div className="mb-5 text-left relative">
            <label className="block text-[15px] font-bold text-black mb-2">
              Email<span className="text-[#da1c2d]">*</span>
            </label>
            <div className="relative">
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-24 py-2.5 text-base border border-gray-300 rounded-full outline-none focus:border-[#008689] focus:ring-1 focus:ring-[#008689]"
                />
                <button 
                    onClick={handleSendCode}
                    className="absolute right-1 top-1 bottom-1 bg-[#3c8dbc] hover:bg-[#367fa9] text-white px-4 rounded-full text-sm transition"
                >
                    Gửi mã
                </button>
            </div>
          </div>

          {/* Input OTP */}
          <div className="mb-2 text-left">
            <label className="block text-[15px] font-bold text-black mb-2">
              Nhập mã OPT <span className="text-[#da1c2d]">*</span>
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-full outline-none focus:border-[#008689] focus:ring-1 focus:ring-[#008689]"
            />
          </div>

          {/* Nút Gửi lại mã */}
          <div className="text-left mb-8">
             <button className="bg-[#5bc0de] hover:bg-[#46b8da] text-white text-[11px] px-3 py-1 rounded-full font-bold">
                Gửi Lại mã
             </button>
          </div>

          {/* Button Xác nhận */}
          <button 
            onClick={handleConfirm}
            className="w-[160px] py-2.5 bg-[#4a9ba1] hover:bg-[#3d8b91] text-white text-lg rounded-full shadow-md transition font-medium"
          >
            Xác nhận
          </button>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#006a6d] text-[#8abdc0] py-8 px-10 text-sm z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
            <div className="mb-4 md:mb-0">
                <h3 className="text-white font-bold mb-1">UTH_ConfMS</h3>
                <p>© 2025 UTH-ConfMS. All rights reserved.</p>
            </div>
            
            <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-black/60 uppercase text-xs mb-1">Thông tin liên hệ</h4>
                    <a href="#" className="hover:text-white transition">uth-consms@gmail.com</a>
                    <p>TP. Hồ Chí Minh</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-black/60 uppercase text-xs mb-1">Trang chủ</h4>
                    <a href="#" className="hover:text-white transition">Hỗ trợ / FAQ</a>
                    <a href="#" className="hover:text-white transition">Chính sách bảo mật</a>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default ForgotPassword;