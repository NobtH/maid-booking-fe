import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ManageBooking.css'; 
import { useNavigate } from 'react-router-dom';

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  const handleNavigateToEditReview = (booking) => {
    navigate(`/reviews/edit`, { state: { booking } });
  };

  const handleNavigateToReview = (booking) => {
    navigate(`/reviews/new`, { state: { booking } });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:4000/api/bookings/mine', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Token từ localStorage
          },
        });

        setBookings(response.data.bookings);
      } catch (err) {
        console.error('Error fetching bookings:', err.message);
        setError(err.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCompleteBooking = async (bookingId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/bookings/${bookingId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: response.data.booking.status } : booking
        )
      );
      alert('Booking completed successfully!');
    } catch (err) {
      console.error(`Error completing booking ${bookingId}:`, err.message);
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi hoàn thành booking.');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: response.data.booking.status } : booking
        )
      );
      alert('Booking cancelled successfully!');
    } catch (err) {
      console.error(`Error cancelling booking ${bookingId}:`, err.message);
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi hủy booking.');
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  const renderBookings = (bookings, statusLabel) => (
    <div className="booking-section">
      <h3 className="text-xl font-semibold mb-4">{statusLabel}</h3>
      {bookings.length === 0 ? (
        <p className="no-bookings">Không có booking nào trong trạng thái này.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-item">
            <h4>{booking.title || 'Booking không có tiêu đề'}</h4>
            <p>
              <strong>Ngày:</strong> {new Date(booking.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Thời gian:</strong> {booking.from} - {booking.to}
            </p>
            <p>
              <strong>Địa điểm:</strong> {booking.location || 'Không rõ địa điểm'}
            </p>
            <p>
              <strong>Giá:</strong> {booking.price ? `${booking.price} VND` : 'Không rõ'}
            </p>
            <p>
              <strong>Người dùng:</strong> {booking.userId?.name || 'Không rõ'}
            </p>
            <p>
              <strong>Người giúp việc:</strong> {booking.maidId?.name || 'Không rõ'}
            </p>
            <p>
              <strong>Trạng thái:</strong> {booking.status}
            </p>
  
            {/* Nút Hoàn Thành và Hủy */}
            <div className="flex gap-4 mt-4">
              {booking.status === 'confirmed' && (
                <div className="button-group">
                  <button
                    className="complete-button"
                    onClick={() =>
                      window.confirm('Bạn có chắc chắn muốn hoàn thành booking này?') &&
                      handleCompleteBooking(booking._id)
                    }
                  >
                    Hoàn thành
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() =>
                      window.confirm('Bạn có chắc chắn muốn hủy booking này?') &&
                      handleCancelBooking(booking._id)
                    }
                  >
                    Hủy
                  </button>
                </div>
              )}
  
              {/* Nút Đánh giá chỉ hiển thị nếu người dùng không phải là người giúp việc tham gia booking */}
              {booking.status === 'completed' &&
                booking.maidId?._id !== localStorage.getItem('userId') && (
                  <div className="button-group">
                    {booking.isReviewed ? (
                      <button
                        className="review-button"
                        onClick={() => handleNavigateToEditReview(booking)}
                      >
                        Sửa đánh giá
                      </button>
                    ) : (
                      <button
                        className="review-button"
                        onClick={() => handleNavigateToReview(booking)}
                      >
                        Đánh giá
                      </button>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  // Phân loại booking theo trạng thái
  const pendingBookings = bookings.filter((booking) => booking.status === 'pending');
  const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed');
  const completedBookings = bookings.filter((booking) => booking.status === 'completed');
  const cancelledBookings = bookings.filter((booking) => booking.status === 'cancelled');

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Quản lý Booking</h2>
      {renderBookings(pendingBookings, 'Trạng thái: Chờ xử lý')}
      {renderBookings(confirmedBookings, 'Trạng thái: Đã xác nhận')}
      {renderBookings(completedBookings, 'Trạng thái: Đã hoàn thành')}
      {renderBookings(cancelledBookings, 'Trạng thái: Đã hủy')}
    </div>
  );
};

export default ManageBooking;
