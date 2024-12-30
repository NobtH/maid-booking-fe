// src/api/workerAPI.js
import axios from 'axios';

const apiUrl = 'http://localhost:4000/api';

// Lấy danh sách giúp việc
export const getWorkers = async () => {
  try {
    const response = await axios.get(`${apiUrl}/workers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin chi tiết của một người giúp việc
export const getWorkerDetails = async (workerId) => {
  try {
    const response = await axios.get(`${apiUrl}/workers/${workerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách bài đăng ngẫu nhiên
export const getRandomPosts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/posts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
