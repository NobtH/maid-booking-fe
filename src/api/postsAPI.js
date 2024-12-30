import axios from 'axios';

// URL gốc của API
const apiUrl = 'http://localhost:4000/api'; // Thay thế bằng URL của backend nếu khác

// Hàm lấy danh sách tất cả bài viết
export const getPosts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/post`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài viết:', error);
    throw error; // Ném lỗi để frontend xử lý
  }
};

// Hàm lấy bài viết ngẫu nhiên
export const getRandomPosts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/post/random`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy bài viết ngẫu nhiên:', error);
    throw error;
  }
};

// Hàm lấy chi tiết bài viết theo ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/post/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết bài viết với ID: ${id}`, error);
    throw error;
  }
};

// Hàm tạo bài viết mới
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${apiUrl}/post`, postData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo bài viết:', error);
    throw error;
  }
};

// Hàm cập nhật bài viết
export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${apiUrl}/post/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật bài viết với ID: ${id}`, error);
    throw error;
  }
};

// Hàm xóa bài viết
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/post/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi xóa bài viết với ID: ${id}`, error);
    throw error;
  }
};
