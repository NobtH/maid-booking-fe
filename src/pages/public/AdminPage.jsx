import React, { useState } from 'react';
import '../../styles/AdminPage.css';
import UserProfileTable from '../../components/UserProfileTable';
import PostTable from '../../components/PostTable';


const AdminPage = () => {
  const [visibleTable, setVisibleTable] = useState(null); // Trạng thái để xác định bảng hiển thị

  return (
    <div className="admin-page">
      {/* Tiêu đề */}
      <section className="admin-header">
        <h1>Quản lý hệ thống GoTime</h1>
        <p>Chọn bảng để xem và quản lý</p>
      </section>

      {/* Các nút chọn bảng */}
      <div className="content-container">
        <button onClick={() => setVisibleTable('userProfile')}>
          Quản lý Hồ sơ Người dùng
        </button>
        <button onClick={() => setVisibleTable('posts')}>
          Quản lý Bài đăng
        </button>
      </div>

      {/* Hiển thị bảng dựa vào trạng thái */}
      <div className="table-container">
        {visibleTable === 'userProfile' && <UserProfileTable />}
        {visibleTable === 'posts' && <PostTable />}
      </div>
    </div>
  );
};

export default AdminPage;