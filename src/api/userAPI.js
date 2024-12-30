// src/api/userAPI.js
import axios from 'axios';

const apiUrl = 'http://localhost:4000/api';

// Lấy thông tin người dùng
// src/api/userAPI.js
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/profile`, { // Đổi từ /users/me sang /profile
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Cập nhật thông tin người dùng
export const updateUserInfo = async (token, userData) => {
  try {
    const response = await axios.put(`${apiUrl}/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
