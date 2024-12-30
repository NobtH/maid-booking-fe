// src/api/authAPI.js
import axios from 'axios';

// Cấu hình URL cơ bản cho API
const apiUrl = 'http://localhost:4000/api';

// Hàm đăng nhập
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, credentials);
    return response.data;  // Trả về { token: '...' }
  } catch (error) {
    if (error.response) {
      console.error('Lỗi từ backend:', error.response.data);
    } else {
      console.error('Lỗi không xác định:', error.message);
    }
    throw error;
  }
};

// Hàm đăng ký
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;  // Trả về thông tin đăng ký thành công
  } catch (error) {
    if (error.response) {
      console.error('Lỗi từ backend:', error.response.data);
    } else {
      console.error('Lỗi không xác định:', error.message);
    }
    throw error;
  }
};
