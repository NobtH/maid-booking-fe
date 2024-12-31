import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách bài đăng từ API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/admin/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("API Response:", response.data); // Kiểm tra dữ liệu trả về
        setPosts(response.data.bookings); // Dùng "bookings" thay vì "posts"
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError(err.response?.data?.message || 'Lỗi khi lấy danh sách bài đăng.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);

  // Xóa bài đăng
  const handleDeletePost = async (id) => {
    try {
      if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
        await axios.delete(`http://localhost:4000/api/admin/bookings/${id}/delete`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        alert('Đã xóa bài đăng thành công.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi xóa bài đăng.');
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Quản lý Bài đăng</h2>
      <table>
        <thead>
          <tr>
            <th>ID Booking</th>
            <th>ID Người dùng</th>
            <th>Trạng thái</th>
            <th>Tiêu đề</th>
            <th>ID Người nhận</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              {/* Hiển thị ID Booking */}
              <td>{post._id || 'Không rõ'}</td>
  
              {/* Hiển thị ID Người dùng */}
              <td>{post.userId || 'Không rõ'}</td>
  
              {/* Hiển thị trạng thái */}
              <td>{post.status || 'Không rõ'}</td>
  
              {/* Hiển thị tiêu đề */}
              <td>{post.title || 'Không rõ'}</td>
  
              {/* Hiển thị ID Người nhận */}
              <td>{post.maidId || 'Không rõ'}</td>
  
              {/* Thao tác xóa */}
              <td>
                <button onClick={() => handleDeletePost(post._id)} style={{ color: 'white', backgroundColor: 'red' }}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
