import React from 'react';
import '../styles/Footer.css';
const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} GoTime. All rights reserved.</p>
      <div className="container">
    <div className="footer-content">
      {/* Logo hoặc tên công ty */}
      <div className="footer-logo">
        <h2>GoTime</h2>
      </div>

      {/* Các liên kết */}
      <div className="footer-links">
        <ul>
          <li><a href="/about">Về chúng tôi</a></li>
          <li><a href="/services">Dịch vụ</a></li>
          <li><a href="/contact">Liên hệ: hoangdungday</a></li>
          <li><a href="/privacy">Chính sách bảo mật</a></li>
        </ul>
      </div>

      {/* Mạng xã hội */}
      <div className="footer-social">
        <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
        <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
      </div>
    </div>

    {/* Bản quyền */}
    <div className="footer-bottom">
      <p>&copy; 2024 GoTime. Bản quyền thuộc về dunghoang .</p>
    </div>
  </div>
    </footer>
  );
};

export default Footer;

