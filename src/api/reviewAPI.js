// src/api/reviewAPI.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

// Đánh giá dịch vụ
export const submitReview = async (token, reviewData) => {
  try {
    const response = await axios.post(`${apiUrl}/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy các đánh giá của người dùng
export const getReviews = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
