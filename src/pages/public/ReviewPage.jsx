import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../styles/ReviewPage.css";

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmitReview = async () => {
    try {
      if (rating < 1 || rating > 5) {
        alert('Vui lòng chọn đánh giá từ 1 đến 5 sao.');
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/api/reviews`,
        {
          bookingId: booking._id,
          maidId: booking.maidId?._id,
          userId: booking.userId?._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Đánh giá thành công!');
      navigate('/manage-bookings');
    } catch (err) {
      console.error('Error submitting review:', err.message);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá.');
    }
  };

  return (
    <div className="container">
      <h2>Đánh Giá Booking</h2>
      {error && <p className="error">{error}</p>}
      <div className="review-form">
        <label>
          Đánh giá (1-5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <label>
          Bình luận:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
          />
        </label>
        <button onClick={handleSubmitReview}>Gửi Đánh Giá</button>
      </div>
    </div>
  );
};


export default ReviewPage;
