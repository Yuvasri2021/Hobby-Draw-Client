import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') || '';

    if (!token) {
      navigate('/login');
    } else if (role !== 'artist') {
      navigate('/not-authorized');
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await axios.post('http://localhost:5000/api/upload/upload', formData);
    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in.');
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await handleImageUpload();

      await axios.post(
        'http://localhost:5000/api/artworks',
        { title, description, price, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Artwork uploaded successfully!');
      navigate('/artgallery');
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="upload-warning">
        ⚠️ Checking authentication...
      </div>
    );
  }

  return (
    <>
      <div className="upload-wrapper">
        <div className="upload-container">
          <h2 className="upload-header">🎨 Upload Your Masterpiece</h2>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                required
              />
            </div>

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}

            <button type="submit" disabled={loading} className="neon-btn">
              {loading ? 'Uploading...' : '🚀 Upload'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
        body {
          margin: 0;
          font-family: 'Orbitron', sans-serif;
          background: #0f0f0f;
        }
        .upload-wrapper {
          min-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .upload-container {
          background: #1a1a1a;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
          width: 100%;
          max-width: 500px;
          border: 2px solid #00e0ff33;
          transition: 0.3s ease;
          min-height: 70vh;
          margin-top: -1%;
        }
        .upload-container:hover {
          box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
        }
        .upload-header {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 30px;
          color: #2d3436;
          text-shadow: 0 0 6px #00fff7, 0 0 10px #00fff7;
        }
        .upload-form .form-group {
          margin-bottom: 20px;
        }
        .upload-form label {
          display: block;
          color: #ccc;
          margin-bottom: 6px;
          font-weight: 600;
        }
        .upload-form input,
        .upload-form textarea {
          width: 100%;
          padding: 12px;
          background: #111;
          border: 1px solid #333;
          color: #fff;
          border-radius: 10px;
          transition: 0.3s;
        }
        .upload-form input:focus,
        .upload-form textarea:focus {
          border-color: #00ffe5;
          outline: none;
          box-shadow: 0 0 10px #00ffe533;
        }
        .image-preview {
          margin-top: 20px;
          text-align: center;
        }
        .image-preview img {
          max-width: 100%;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }
        .image-preview img:hover {
          transform: scale(1.03);
        }
        .neon-btn {
          width: 100%;
          padding: 12px 0;
          font-size: 1.2rem;
          font-weight: bold;
          background: rgb(98, 221, 221);
          color: #000;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2%;
        }
        .neon-btn:hover {
          box-shadow: 0 0 20px #00e0ff, 0 0 40px #00e0ff;
        }
        .upload-warning {
          margin-top: 100px;
          text-align: center;
          color: #ff4d4d;
          background: #2a0000;
          padding: 20px;
          border-radius: 12px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 600;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
        }
      `}</style>
    </>
  );
}
