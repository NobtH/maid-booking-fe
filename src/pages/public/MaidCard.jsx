import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Worker.css';

const MaidCard = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [maid, setMaids] = useState(null); // State để lưu dữ liệu maid
  const [loading, setLoading] = useState(true); // State để quản lý loading
  const [error, setError] = useState(null); // State để lưu thông báo lỗi

  useEffect(() => {
    if (!id) {
      setError('ID không hợp lệ.');
      return;
    }

    // Sử dụng axios để gọi API
    const fetchMaids = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/maids/${id}`);
        setMaids(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Tắt loading
      } catch (err) {
        setError('Không thể tải thông tin nhân viên.');
        console.error('Lỗi khi tải dữ liệu:', err.message);
        setLoading(false);
      }
    };

    fetchMaids();
  }, [id]);

  if (loading) {
    return <p>Đang tải thông tin nhân viên...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <a href="/">Quay lại trang chủ</a>
      </div>
    );
  }

  if (!maid) {
    return (
      <p>
        Không tìm thấy nhân viên. <a href="/">Quay lại trang chủ</a>
      </p>
    );
  }

  return (
    <div className="worker-card">
      <div className="worker-info">
        <h3 className="worker-name">{maid.userId?.name || 'Không có tên'}</h3>
        <p className="worker-location">Địa điểm: {maid.location}</p>
        <p className="worker-age">Tuổi: {maid.age}</p>
        <p className="worker-experience">Kinh nghiệm: {maid.experience} năm</p>
        
      </div>
    </div>
  );
};

export default MaidCard;
