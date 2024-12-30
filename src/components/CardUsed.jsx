import React from 'react';
import '../styles/CardUsed.css';
import { useNavigate } from 'react-router-dom';

const CardUsed = ({ booking }) => {
  const { _id, title, description, location, phone, price, date, from, to, status } = booking;
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (_id) {
      navigate(`/booking/${_id}`);
    } else {
      console.error('Không tìm thấy id của booking');
    }
  };

  // Xử lý mô tả xuống dòng
  const formatDescription = (desc) => {
    if (!desc) return 'Không có mô tả';
    return desc.split('\n').map((line, index) => <p key={index}>{line.trim()}</p>);
  };

  return (
    <div className="booking-card">
      <h2 className="booking-card__title">{title || 'Không có tiêu đề'}</h2>
      <div className="booking-card__info">
        <p><strong>Địa điểm:</strong> {location}</p>
        <p><strong>Số điện thoại:</strong> {phone}</p>
        <p><strong>Giá:</strong> {price.toLocaleString()} VND</p>
        <p><strong>Ngày:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Thời gian:</strong> {from} - {to}</p>
        <p><strong>Trạng thái:</strong> {status}</p>
        <p><strong>Mô tả:</strong></p>
        <div>{formatDescription(description)}</div>
      </div>
      <button onClick={handleViewMore} className="booking-card__button">
        Xem thêm
      </button>
    </div>
  );
};

export default CardUsed;
