import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state;

  const [rating, setRating] = useState(booking.review?.rating || 0);
  const [comment, setComment] = useState(booking.review?.comment || '');
  const [error, setError] = useState(null);

  const handleUpdateReview = async () => {
    try {
      if (rating < 1 || rating > 5) {
        alert('Vui lòng chọn đánh giá từ 1 đến 5 sao.');
        return;
      }

      const response = await axios.patch(
        `http://localhost:4000/api/reviews/${booking.reviewId}`, // ID bài đánh giá
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      alert('Đánh giá đã được cập nhật!');
      navigate('/manage-bookings');
    } catch (err) {
      console.error('Error updating review:', err.message);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật đánh giá.');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Sửa Đánh Giá</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="review-form">
        <label className="block mb-2">
          <span className="text-gray-700">Đánh giá (1-5):</span>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Bình luận:</span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </label>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleUpdateReview}
        >
          Cập Nhật
        </button>
      </div>
    </div>
  );
};

export default EditReviewPage;
