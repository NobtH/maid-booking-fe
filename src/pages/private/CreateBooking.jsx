import React, { useState, useEffect } from "react";
import "../../styles/CreatePost.css"; 
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    tel: "",
    province: "",
    district: "",
    address: "",
    title: "",
    content: "",
    requirements: "",
    benefits: "",
    price: "",
    from: "",
    to: "",
    date: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  // Cập nhật giá trị trong form
  const handleChange =  (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form is being submitted.");
    const errors = {};

    // Kiểm tra lỗi trên các trường cần thiết
    if (!formData.tel.trim()) {
      errors.tel = "Số điện thoại là bắt buộc.";
    }
   
    if (!formData.content.trim()) {
      errors.content = "Nội dung là bắt buộc.";
    }
    if (!formData.price.trim() || isNaN(formData.price)) {
      errors.price = "Giá là bắt buộc và phải là một số hợp lệ.";
    }

    // Nếu có lỗi, hiển thị
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Gộp các trường vào description
    const description = `
      Nội dung: ${formData.content}
      Yêu cầu: ${formData.requirements}
      Phúc lợi: ${formData.benefits}
    `;

    // Gộp province, district và address thành location
    const location = `${formData.address}, ${formData.district}, ${formData.province}`;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User not logged in.");
      return;
    }
    const token = localStorage.getItem("token");
  if (!token) {
    console.error("User not logged in.");
    return;
  }

    // Chuyển price từ string sang số trước khi gửi
    const dataToSend = {
      userId, 
      phone: formData.tel,
      location,
      description,
      price: parseFloat(formData.price),
      from: formData.from,
      to: formData.to,
      date: formData.date,
      title: formData.title,
    };


    // Gửi POST request
    fetch("http://localhost:4000/api/bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created successfully:", data);
        navigate("/");  // Điều hướng tới trang bài đăng vừa tạo
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };
  // Lấy danh sách tỉnh/thành và quận/huyện
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/", )
      .then((response) => response.json())
      .then((data) => setProvince(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (formData.province) {
      fetch(`https://provinces.open-api.vn/api/p/${formData.province}?depth=2`)
        .then((response) => response.json())
        .then((data) => setDistrict(data.districts || []))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [formData.province]);

  return (
    <form onSubmit={handleSubmit} className="post">
      <h5 className="section-title">Tạo Booking</h5>
      <div className="row">
        <div className="col-md-12">
          <div className="form-row">
            {/* Số điện thoại */}
            <div className="form-group col-md-6">
              <label htmlFor="inputTel">
                Số điện thoại<span className="color-red">*</span>
              </label>
              <input
                name="tel"
                type="text"
                className="form-control"
                id="inputTel"
                value={formData.tel}
                onChange={handleChange}
              />
              {errors.tel && <span className="error">{errors.tel}</span>}
            </div>
          </div>

          {/* Tỉnh/thành */}
          <div>
            <label htmlFor="province">Tỉnh/thành:</label>
            <select
              name="province"
              id="province"
              className="form-control"
              value={formData.province}
              onChange={handleChange}
            >
              <option value="">Chọn tỉnh/thành</option>
              {province.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>

            {/* Quận/huyện */}
            {formData.province && (
              <div>
                <label htmlFor="district">Quận/huyện:</label>
                <select
                  name="district"
                  id="district"
                  className="form-control"
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option value="">Chọn quận/huyện</option>
                  {district.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Địa chỉ cụ thể */}
          <div className="form-group">
            <label htmlFor="inputAddress">Địa chỉ cụ thể:</label>
            <input
              type="text"
              name="address"
              className="form-control"
              id="inputAddress"
              placeholder="Địa chỉ cụ thể"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Tiêu đề */}
          <div className="form-group">
            <label htmlFor="inputTitle">
              Tiêu đề<span className="color-red">*</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="inputTitle"
              placeholder="Tiêu đề"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          {/* Nội dung */}
          <div className="form-group">
            <label htmlFor="editor">
              Nội dung<span className="color-red">*</span>
            </label>
            <textarea
              name="content"
              id="editor"
              className="form-control"
              rows="5"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
            {errors.content && <span className="error">{errors.content}</span>}
          </div>

          {/* Yêu cầu */}
          <div className="form-group">
            <label>Yêu cầu</label>
            <textarea
              name="requirements"
              className="form-control"
              rows="3"
              value={formData.requirements}
              onChange={handleChange}
            />
          </div>

          {/* Phúc lợi */}
          <div className="form-group">
            <label>Phúc lợi</label>
            <textarea
              name="benefits"
              className="form-control"
              rows="3"
              value={formData.benefits}
              onChange={handleChange}
            />
          </div>

          {/* Giá */}
          <div className="form-group col-md-6">
            <label htmlFor="inputPrice">
              Giá<span className="color-red">*</span>
            </label>
            <input
              name="price"
              type="text"
              className="form-control"
              id="inputPrice"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          {/* Ngày */}
          <div className="form-group">
            <label htmlFor="inputDate">
              Ngày<span className="color-red">*</span>
            </label>
            <input
              type="date"
              name="date"
              className="form-control"
              id="inputDate"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          {/* Thời gian từ */}
          <div className="form-group">
            <label>Thời gian từ:</label>
            <input
              name="from"
              type="time"
              className="form-control"
              value={formData.from}
              onChange={handleChange}
            />
          </div>

          {/* Thời gian đến */}
          <div className="form-group">
            <label>Thời gian đến:</label>
            <input
              name="to"
              type="time"
              className="form-control"
              value={formData.to}
              onChange={handleChange}
            />
          </div>

          {/* Nút hành động */}
          <div className="col-md-12 box-avatar row">
            <div className="col-md-6">
              <button type="button" className="btn btn-view">
                Xem trước
              </button>
            </div>
            <div className="col-md-6">
              <button type="submit" className="btn submit-post">
                Đăng ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateBooking;
