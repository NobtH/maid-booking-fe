import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { getUserInfo, updateUserInfo } from '../../api/userAPI';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [maid, setMaid] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [maidAge, setMaidAge] = useState('');
  const [maidExperience, setMaidExperience] = useState('');
  const [maidLocation, setMaidLocation] = useState('');
  const [maidDescription, setMaidDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bạn chưa đăng nhập');
      setLoading(false);
      return;
    }

    getUserInfo(token)
      .then((data) => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setRole(data.role);

        if (data.role === 'maid') {
          setMaid(data);
          setMaidAge(data.age);
          setMaidExperience(data.experience);
          setMaidLocation(data.location);
          setMaidDescription(data.description);
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
      const updatedUser = {
        name,
        phone,
        address,
        ...(maid && {
          age: maidAge,
          experience: maidExperience,
          location: maidLocation,
          description: maidDescription,
        }),
      };

      const updatedData = await updateUserInfo(token, updatedUser);
      setUser(updatedData);
      if (updatedData.role === 'maid') setMaid(updatedData);
      setSuccess('Cập nhật thông tin thành công!');
      setEditMode(false);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            disabled={!editMode}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Email
          </Typography>
          <TextField
            value={email}
            fullWidth
            margin="normal"
            disabled
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Số Điện Thoại
          </Typography>
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            disabled={!editMode}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Địa Chỉ
          </Typography>
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            disabled={!editMode}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Vai Trò
          </Typography>
          <TextField
            value={role}
            fullWidth
            margin="normal"
            disabled
          />

          {maid && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                Tuổi
              </Typography>
              <TextField
                value={maidAge}
                onChange={(e) => setMaidAge(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!editMode}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Kinh Nghiệm
              </Typography>
              <TextField
                value={maidExperience}
                onChange={(e) => setMaidExperience(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!editMode}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Địa Điểm
              </Typography>
              <TextField
                value={maidLocation}
                onChange={(e) => setMaidLocation(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!editMode}
              />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Mô Tả
              </Typography>
              <TextField
                value={maidDescription}
                onChange={(e) => setMaidDescription(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!editMode}
              />
            </>
          )}

          <Button
            variant="contained"
            color={editMode ? 'success' : 'primary'}
            onClick={editMode ? handleSave : () => setEditMode(true)}
            fullWidth
            sx={{ marginTop: 3 }}
          >
            {editMode ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
