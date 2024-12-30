import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress, MenuItem } from '@mui/material';
import { registerUser } from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }

    if (role === 'maid' && (!age || !experience|| !location)) {
      setError('Vui lòng điền đầy đủ thông tin cho vai trò Người giúp việc.');
      return;
    }

    try {
      setIsLoading(true);
      const credentials = { name, email, password, phone, address, role };

      // Nếu role là maid, thêm các trường bổ sung
      if (role === 'maid') {
        credentials.age = age;
        credentials.experience = experience;
        // credentials.hourlyRate = hourlyRate;
        credentials.location = location;
        credentials.description = description;
      }

      await registerUser(credentials);
      setSuccess(true);
      setError('');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '50px auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Đăng Ký
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên người dùng"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Mật khẩu"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Xác nhận mật khẩu"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Số điện thoại"
          type="text"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Địa chỉ"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Vai trò"
          select
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
          required
        >
          <MenuItem value="user">Người dùng</MenuItem>
          <MenuItem value="maid">Người giúp việc</MenuItem>
        </TextField>

        {/* Các trường bổ sung nếu role là "maid" */}
        {role === 'maid' && (
          <>
            <TextField
              label="Tuổi"
              type="number"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Kinh nghiệm (năm)"
              type="number"
              fullWidth
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              margin="normal"
              required
            />
            
            <TextField
              label="Địa điểm làm việc"
              type="text"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Mô tả"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              required
            />
          </>
        )}

        {error && <Alert severity="error" sx={{ marginY: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginY: 2 }}>Đăng ký thành công! Bạn có thể đăng nhập.</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Đăng Ký'}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterPage;
