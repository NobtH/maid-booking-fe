import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfileTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('API Response:', response.data); // Debug response
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err.message); // Debug lỗi
        setError(err.response?.data?.message || 'Lỗi khi lấy danh sách người dùng.');
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);

  // Xử lý nhập liệu cho người dùng mới
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Thêm người dùng mới
  const handleAddUser = () => {
    const id = users.length + 1; // Tự động sinh id cho người dùng mới
    setUsers([...users, { ...newUser, id }]);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: '',
    });
  };

  const handleDeleteUser = async (id) => {
    try {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');

    if (confirmDelete) {
      // Nếu người dùng xác nhận, thực hiện xóa
      await axios.delete(`http://localhost:4000/api/admin/users/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Cập nhật danh sách người dùng sau khi xóa thành công
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

      // Hiển thị thông báo thành công
      alert('Đã xóa người dùng thành công.');
    }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi khi xóa người dùng.');
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
      <h2>Danh Sách Người Dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfileTable;
