import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MaidListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const maids = location.state?.maids || [];

  const handleViewMore = (id) => {
    navigate(`/maids/${id}`);
  };

  return (
    <div className="maid-list-page">
      <h2>Kết quả tìm kiếm</h2>
      {maids.length > 0 ? (
        <ul>
          {maids.map((maid) => (
            <li key={maid._id}>
              <p><strong>{maid.name}</strong></p>
              <p>Tuổi: {maid.age}</p>
              <p>Khu vực: {maid.location}</p>
              <button onClick={() => handleViewMore(maid._id)}>Xem thêm</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không tìm thấy người giúp việc nào.</p>
      )}
    </div>
  );
};

export default MaidListPage;
