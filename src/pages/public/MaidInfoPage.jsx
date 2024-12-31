import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/MaidInfoPage.css'; // Đường dẫn tới file CSS của bạn

const MaidInfoPage = () => {
  const { id } = useParams(); // Lấy ID của Maid từ URL
  const [maid, setMaid] = useState(null);
  const [userName, setUserName] = useState('Không rõ tên'); // Lưu tên người dùng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaidInfo = async () => {
      try {
        setLoading(true);

        // Lấy thông tin Maid
        const maidResponse = await axios.get(`http://localhost:4000/api/maids/${id}`);
        const maidData = maidResponse.data;
        setMaid(maidData);

        // Lấy tên người dùng dựa trên userId từ Maid
        if (maidData.userId) {
          const userResponse = await axios.get(`http://localhost:4000/api/users/${maidData.userId}/name`);
          setUserName(userResponse.data.name);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Lỗi khi lấy thông tin người giúp việc.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaidInfo();
  }, [id]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!maid) {
    return <p>Không tìm thấy thông tin người giúp việc.</p>;
  }

  const { age, location, description, ratings, experience, totalRatings } = maid;

  return (
    <div className="maid-info-page">
      <div className="maid-info-card">
        <div className="maid-info-header">
          <h2>{userName}</h2>
          <p className="maid-info-rating">
            {ratings ? (
              <>
                ⭐ {ratings.toFixed(1)}
              </>
            ) : (
              'Chưa có đánh giá'
            )}
          </p>
        </div>
        <div className="maid-info-details">
          <p><strong>Tuổi:</strong> {age}</p>
          <p><strong>Kinh nghiệm:</strong> {experience}</p>
          <p><strong>Tổng số đánh giá:</strong> {totalRatings} <strong> năm</strong></p>
          <p><strong>Khu vực hoạt động:</strong> {location}</p>
          <p><strong>Mô tả:</strong> {description || 'Không có mô tả'}</p>
        </div>
      </div>
    </div>
  );
};

export default MaidInfoPage;
