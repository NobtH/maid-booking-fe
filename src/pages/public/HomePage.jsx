import React, { useState, useEffect } from 'react';
import MaidList from '../../components/MaidList';
import BookingList from '../../components/BookingList';

import '../../styles/HomePage.css';
const HomePage = () => {
 
  return (
    <div className="home-page">
      {/* Banner */}
      <section className="hero bg-blue-500 text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-2">Chào mừng bạn đến với GoTime</h1>
        <p className="text-lg">Tìm người giúp việc nhanh chóng và thuận tiện nhất</p>
      </section>

      {/* Bố trí WorkerList bên trái và PostCard bên phải */}
      <div className="content-container flex">
        <div className="worker-list-container w-1/3 p-4">
          <MaidList />
        </div>
        <div className="post-card-container w-2/3 p-4">
        <BookingList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;