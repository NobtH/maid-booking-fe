import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/BookingDetail.css";
import apiClient from '../api/apiClient';

const BookingDetail = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch booking details
    apiClient
      .get(`/bookings/${id}`)
      .then((response) => setBooking(response.data.booking))
      .catch((err) => setError(err.response?.data?.message || 'Lỗi khi tải chi tiết booking.'));
  }, [id]);

  console.log(`/bookings/${id}/accept`);

  const handleAcceptBooking = () => {
    const token = localStorage.getItem('token'); // Get token
    if (!token) {
      alert('Bạn cần đăng nhập để nhận việc.');
      navigate('/login');
      return;
    }
    console.log('Accepting booking:', id);
    console.log(token);

    apiClient
      .post(`/bookings/${id}/accept`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        alert('Nhận việc thành công!');
        setBooking(response.data.booking); // Update booking status
      })
      .catch((err) => {
        console.log(err.response);
        console.error('Error accepting booking:', err);
        alert(err.response?.data?.message || 'Lỗi khi nhận việc.');
      });
  };

  if (error) {
    return <p className="booking-detail__error">{error}</p>;
  }

  if (!booking) {
    return <p className="booking-detail__loading">Đang tải chi tiết booking...</p>;
  }

  const { title, description, location, phone, price, date, from, to, status } = booking;

  return (
    <div className="booking-detail">
      <div className="booking-detail__header">
        <h2 className="booking-detail__title">{title || 'Thông tin chi tiết'}</h2>
      </div>
      <div className="booking-detail__body">
        <div className="booking-detail__info">
          <p><strong>Địa điểm:</strong> {location || 'Không có thông tin'}</p>
          <p><strong>Số điện thoại:</strong> {phone || 'Không có thông tin'}</p>
          <p><strong>Giá:</strong> {price ? `${price.toLocaleString()} VND` : 'Không có thông tin'}</p>
          <p><strong>Ngày:</strong> {date ? new Date(date).toLocaleDateString() : 'Không có thông tin'}</p>
          <p><strong>Thời gian:</strong> {from && to ? `${from} - ${to}` : 'Không có thông tin'}</p>
          <p><strong>Trạng thái:</strong> {status || 'Không có thông tin'}</p>
        </div>
        <div className="booking-detail__description">
          <h3 className="booking-detail__sub-title">Mô tả</h3>
          <p>{description || 'Không có mô tả'}</p>
        </div>
      </div>
      {status === 'pending' && (
        <div className="booking-detail__footer">
          <button 
            className="booking-detail__accept-button"
            onClick={handleAcceptBooking}
          >
            Nhận việc
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
