import React, { useState } from 'react';
import '../../styles/AdminPage.css';
import UserProfileTable from '../../components/UserProfileTable';
import PostTable from '../../components/PostTable';
import axios from 'axios';

const AdminPage = () => {
  const [visibleTable, setVisibleTable] = useState(null); // Trạng thái để xác định bảng hiển thị
  const [statistics, setStatistics] = useState(null); // Trạng thái lưu số liệu thống kê
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/statistics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStatistics(response.data.statistics);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi lấy số liệu thống kê.');
    }
  };

  return (
    <div className="admin-page">
      {/* Tiêu đề */}
      <section className="admin-header">
        <h1>Quản lý hệ thống GoTime</h1>
        <p>Chọn bảng để xem và quản lý</p>
      </section>

      {/* Các nút chọn bảng */}
      <div className="content-container">
      <button
    onClick={() => {
      setVisibleTable('userProfile');
      setStatistics(null);
      setError(null);
    }}
  >
          Quản lý Hồ sơ Người dùng
          </button>
            <button
              onClick={() => {
                setVisibleTable('posts');
                setStatistics(null); 
                setError(null);
              }}
            >
          Quản lý Bài đăng
        </button>
        <button
    onClick={() => {
      fetchStatistics();
      setVisibleTable(null);
    }}
  >
          Hiển thị số liệu thống kê
        </button>
      </div>

      {/* Hiển thị bảng dựa vào trạng thái */}
      <div className="table-container">
        {visibleTable === 'userProfile' && <UserProfileTable />}
        {visibleTable === 'posts' && <PostTable />}
        {statistics && (
          <div className="statistics-container">
            <h3>Số liệu thống kê</h3>
            <p><strong>Tổng số người dùng:</strong> {statistics.users}</p>
            <p><strong>Tổng số người giúp việc:</strong> {statistics.maids}</p>
            <p><strong>Tổng số bookings:</strong> {statistics.bookings.map(b => `${b._id}: ${b.count}`).join(', ')}</p>
            <p><strong>Doanh thu:</strong> {statistics.revenue} VND</p>
            <p><strong>Tổng số đánh giá:</strong> {statistics.reviews}</p>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminPage;
