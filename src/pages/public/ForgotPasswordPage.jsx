import React, { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi yêu cầu tới API để xử lý quên mật khẩu
    alert(`Email khôi phục đã được gửi tới ${email}`);
  };

  return (
    <div>
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Khôi phục</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
