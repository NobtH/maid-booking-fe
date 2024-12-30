// src/api/bookingAPI.js
import axios from 'axios';

const apiUrl = 'http://localhost:4000/api';

// Đặt lịch cho dịch vụ giúp việc
export const bookService = async (token, bookingData) => {
  try {
    const response = await axios.post(`${apiUrl}/bookings`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin các lịch đã đặt
export const getBookings = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
