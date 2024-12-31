import React, { useEffect, useState } from 'react';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = ({ maid, userId }) => {
  const { _id, age, location, description, ratings } = maid;
  const navigate = useNavigate();
  const [name, setName] = useState('Không rõ tên');

  // Lấy tên người dùng dựa trên userId
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${userId}/name`); // API getUserByName
        setName(response.data.name);
      } catch (error) {
        console.error(`Lỗi khi lấy tên người dùng:`, error.message);
      }
    };

    if (userId) fetchUserName();
  }, [userId]);

  const handleViewMore = () => {
    navigate(`/maids/${userId}`);
  };

  return (
    <div className="card">
      <div className="card__img">
      <img
          src="/defaultUser.png" // Đường dẫn ảnh trong thư mục public
          alt="User Avatar"
          className="maid-image"
        />
      </div>
      <h2 className="card__name">{name}</h2>
      <p className="card__rating">
        ⭐ {ratings ? ratings.toFixed(1) : 'Chưa có đánh giá'}
      </p>
      <p className="card__location">Tuổi: {age} | {location}</p>
      {description && (
        <p className="card__description">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
      )}
      <button onClick={handleViewMore} className="card__button">
        Xem thêm
      </button>
    </div>
  );
};

export default Card;
