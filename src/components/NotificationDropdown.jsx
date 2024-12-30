import React, { useState } from "react";
import "../styles/NotificationDropdown.css";

const NotificationDropdown = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="notification-container">
     
      <button onClick={toggleDropdown} className="notification-button">
        <span className='thongbao'>Thông báo</span>
        <i className="fa-solid fa-bell"></i>
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
         
        )}
      </button>
      {isOpen && (
        <div className="notification-dropdown">
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="notification-item">
                  {notification}
                </li>
              ))
            ) : (
              <li className="notification-item">Không có thông báo</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
