import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { getUserInfo, updateUserInfo } from '../api/userAPI';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // Chế độ chỉnh sửa
  const navigate = useNavigate();

  const [maidInfo, setMaidInfo] = useState({
    age: '',
    experience: '',
    location: '',
    ratings: [],
    totalRatings: 0,
    totalScore: 0,
    description: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      setError('Bạn chưa đăng nhập');
      setLoading(false);
      return;
    }
    console.log('Token:', token);
    getUserInfo(token)
      .then((data) => {
        console.log('User Data:', data);
        setUser(data);
        if (data.role === 'maid') {
          // Lưu thông tin maid nếu là maid
          setMaidInfo({
            age: data.age,
            experience: data.experience,
            location: data.location,
            ratings: data.ratings,
            totalRatings: data.totalRatings,
            totalScore: data.totalScore,
            description: data.description,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Không thể tải thông tin hồ sơ');
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bạn chưa đăng nhập');
      return;
    }

    try {
      setError('');
      setSuccess('');
      const updatedUser = await updateUserInfo(token, { ...user, ...maidInfo });
      setUser(updatedUser);
      setSuccess('Cập nhật thông tin thành công!');
      setEditMode(false); // Thoát chế độ chỉnh sửa
    } catch (err) {
      console.error(err);
      setError('Cập nhật thông tin thất bại');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: '50px auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
        Hồ Sơ Của Bạn
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}

      {user && (
        <Box component="form">
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Tên Người Dùng
          </Typography>
          <TextField
            value={user.name}
            fullWidth
            margin="normal"
            disabled={!editMode}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Email
          </Typography>
          <TextField
            value={user.email}
            fullWidth
            margin="normal"
            disabled
          />

          {user.role === 'maid' && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Tuổi
              </Typography>
              <TextField
                value={maidInfo.age}
                fullWidth
                margin="normal"
                disabled={!editMode}
                onChange={(e) => setMaidInfo({ ...maidInfo, age: e.target.value })}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Kinh Nghiệm (Năm)
              </Typography>
              <TextField
                value={maidInfo.experience}
                fullWidth
                margin="normal"
                disabled={!editMode}
                onChange={(e) => setMaidInfo({ ...maidInfo, experience: e.target.value })}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Vị Trí
              </Typography>
              <TextField
                value={maidInfo.location}
                fullWidth
                margin="normal"
                disabled={!editMode}
                onChange={(e) => setMaidInfo({ ...maidInfo, location: e.target.value })}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Mô Tả
              </Typography>
              <TextField
                value={maidInfo.description}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                disabled={!editMode}
                onChange={(e) => setMaidInfo({ ...maidInfo, description: e.target.value })}
              />
            </>
          )}

          {!editMode ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditMode(true)}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Save Changes
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
