import React, { useEffect, useState } from 'react';
import Card from './Card';
import './index.css';
import axios from 'axios';

const MaidList = () => {
  const [maids, setMaids] = useState([]);

  useEffect(() => {
    const fetchMaids = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/maids'); // API maids
        setMaids(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người giúp việc:', error.message);
      }
    };

    fetchMaids();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Người giúp việc nổi bật</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {maids.length > 0 ? (
          maids.map((maid) => (
            <Card
              key={maid._id}
              maid={maid} // Truyền toàn bộ dữ liệu maid
              userId={maid.userId} // Truyền userId để lấy tên người dùng
            />
          ))
        ) : (
          <p className="text-center col-span-3">Không có dữ liệu.</p>
        )}
      </div>
    </div>
  );
};

export default MaidList;
