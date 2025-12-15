import React, { useState } from 'react';
import './RegisterPage.css'; // CSS riêng cho Register

const RegisterPage = () => {
  const [language, setLanguage] = useState('en');

  // Icon Register
  const RegisterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37c.69-1.19 1.94-1.87 3.468-1.87h4c1.528 0 2.778.68 3.468 1.87A7 7 0 0 0 8 1z"/>
    </svg>
  );

  return (
    <div className="register-container">
      <div className="register-card">

        {/* Header */}
        <div className="register-header">
          <div className="logo-circle">
            <RegisterIcon />
          </div>
          <h2 className="app-name">UTH-ConfMS</h2>
          <p className="app-description">
            UTH Scientific Conference Paper Management System
          </p>
        </div>

        {/* Language toggle */}
        <div className="language-toggle">
          <button
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          <button
            className={`lang-btn ${language === 'vi' ? 'active' : ''}`}
            onClick={() => setLanguage('vi')}
          >
            Tiếng Việt
          </button>
        </div>

        {/* Register Form */}
        <form className="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Nguyen Van A" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@uth.edu.vn" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select>
              <option>Author</option>
              <option>Reviewer</option>
              <option>Chair</option>
            </select>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="login-redirect">
          <p>
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
