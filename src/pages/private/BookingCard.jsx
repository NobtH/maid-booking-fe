import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/BookingCard.css'; // Import CSS cho BookingCard

const BookingCard = () => {
  const { id } = useParams(); // Lấy id từ URL
  console.log(id);
  const [booking, setBooking] = useState(null); // State để lưu dữ liệu booking
  const [loading, setLoading] = useState(true); // State để quản lý loading

  useEffect(() => {
    if (!id) {
      console.error('ID không hợp lệ.');
      return;
    }

    fetch(`http://localhost:4000/api/bookings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Booking không tồn tại');
        }
        return response.json();
      })
      .then((data) => {
        setBooking(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi tải booking:', error);
        setLoading(false);
      });
  }, [id]); // Đảm bảo id thay đổi khi URL thay đổi

  if (loading) {
    return <p>Đang tải thông tin booking...</p>;
  }

  if (!booking) {
    return (
      <p>
        Không tìm thấy booking. <a href="/">Quay lại trang chủ</a>
      </p>
    );
  }

  return (
    <div className="booking-card">
      <h2 className="booking-title">Chi tiết booking</h2>
      <p className="booking-details">
        <strong>Mô tả:</strong> {booking.description || 'Không có mô tả'} <br />
        <strong>Địa điểm:</strong> {booking.location} <br />
        <strong>Số điện thoại:</strong> {booking.phone} <br />
        <strong>Giá:</strong> {booking.price.toLocaleString()} VND <br />
        <strong>Ngày:</strong> {new Date(booking.date).toLocaleDateString()} <br />
        <strong>Thời gian:</strong> {booking.from} - {booking.to} <br />
        <strong>Trạng thái:</strong> {booking.status} <br />
      </p>
      <div className="booking-images">
        {booking.images && booking.images.length > 0 ? (
          booking.images.map((image, index) => (
            <img
              key={index}
              src={`/images/${image}`}
              alt={`Booking Image ${index + 1}`}
              className="booking-image"
            />
          ))
        ) : (
          <p>Không có hình ảnh nào được đính kèm.</p>
        )}
      </div>
      <button>
        <a href="/">Quay lại trang chủ</a>
      </button>
    </div>
  );
};

export default BookingCard;
