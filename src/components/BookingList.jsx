import React, { useEffect, useState } from "react";
import "../styles/BookingList.css";
import CardUsed from "./CardUsed";

const BookingList = () => {
  const [bookings, setBookings] = useState([]); // State lưu dữ liệu booking
  const [loading, setLoading] = useState(true); // State quản lý loading
  const [error, setError] = useState(null); // State quản lý lỗi
  const [sortOrder, setSortOrder] = useState("newest"); // State sắp xếp

  useEffect(() => {
    // Lấy dữ liệu booking từ API
    fetch("http://localhost:4000/api/bookings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể tải danh sách booking");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.bookings)) {
          setBookings(data.bookings); // Đảm bảo dữ liệu trả về là mảng
        } else {
          throw new Error("Dữ liệu không hợp lệ");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách booking:", error);
        setError("Lỗi khi tải danh sách booking. Vui lòng thử lại sau.");
        setLoading(false);
      });
  }, []);

  const sortedBookings = bookings.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  if (loading) {
    return <p>Đang tải danh sách booking...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p>Không có booking nào để hiển thị.</p>;
  }

  return (
    <div className="bookinglist-container">
      <div className="header-container">
        <h2 className="bookinglist__header">Danh sách booking gần đây</h2>
        <div className="sort-container">
          <label htmlFor="sortOrder">Sắp xếp:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedBookings.map((booking) => (
          <CardUsed key={booking._id || booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
