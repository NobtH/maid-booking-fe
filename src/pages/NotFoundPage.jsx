import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css'; // Đảm bảo bạn tạo file CSS riêng

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <h1>404 - Trang không tồn tại</h1>
      <p>Rất tiếc, chúng tôi không thể tìm thấy trang bạn yêu cầu.</p>
      <button onClick={handleGoHome}>Quay lại Trang chủ</button>
    </div>
  );
};

export default NotFoundPage;
