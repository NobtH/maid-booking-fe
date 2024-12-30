import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { loginUser } from '../../api/authAPI';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.id);
      localStorage.setItem("role", response.user.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  const handleRedirectToRegister = () => {
    navigate('/register'); // Chuyển hướng đến trang đăng ký
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
        Đăng Nhập
      </Typography>
      <form onSubmit={handleSubmit}>
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
        {error && (
          <Alert severity="error" sx={{ marginY: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Đăng Nhập
        </Button>
      </form>

      {/* Nút Đăng Ký */}
      <Button
        variant="text"
        color="secondary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleRedirectToRegister}
      >
        Chưa có tài khoản? Đăng Ký
      </Button>
    </Box>
  );
};

export default LoginPage;
