import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Đảm bảo file CSS được cập nhật phù hợp

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName"); // Lưu trữ tên người dùng sau khi đăng nhập
  const [query, setQuery] = useState(""); // State quản lý query tìm kiếm

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };
  const handleManage = () => navigate("/manage");
  const handleProfile = () => navigate("/profile");

  const handlePost = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để đăng tin!"); // Hiển thị thông báo yêu cầu đăng nhập
      navigate("/login"); // Điều hướng đến trang đăng nhập
    } else {
      navigate("/bookings"); // Nếu đã đăng nhập, điều hướng đến trang đăng tin
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header className="header">
  <div className="header-container">
    {/* Logo */}
    <div className="menu-logo">
      <a href="/" className="logo">
        <i className="fa-solid fa-dragon"></i>
        <b>Timgiupviec</b>
      </a>
    </div>

    {/* Search & Post */}
    <div className="menu-search-a">
      <div className="search">
        <form onSubmit={handleSubmit} className="search-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm người giúp việc..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            aria-label="Tìm kiếm người giúp việc" // Thêm mô tả cho input
          />
          <span className="search-icon">
            <i className="fa-solid fa-search"></i>
          </span>
        </form>
      </div>
      <div> <div></div></div>
      <div className="btn-post">
        <button onClick={handlePost} className="post-button">
          <span style={{ color: "#ffffff" }}>Đăng tin</span>
          <span className="icon-post">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </button>
      </div>
    </div>

    {/* Menu items */}
    <ul className="menu">
      {token ? (
        <>
          <li className="menu-item">
            <button onClick={handleManage} className="menu-button">
              <span className="icon ic-manager"></span>Quản lý
            </button>
          </li>

          <li className="menu-item">
            <button onClick={handleProfile} className="menu-button">
              <span className="icon ic-user"></span>
              {userName || "Tài khoản"}
            </button>
          </li>

          {/* Logout button moved to the right */}
          <li className="menu-item logout-item">
            <button onClick={handleLogout} className="menu-button">
              <span className="icon ic-logout"></span>Đăng xuất
            </button>
          </li>
        </>
      ) : (
        <li className="menu-item">
          <button
            onClick={() => navigate("/login")}
            className="menu-button"
          >
            <span className="icon ic-login"></span>Đăng nhập
          </button>
        </li>
      )}
    </ul>
  </div>
</header>

  );
};

export default Header;
