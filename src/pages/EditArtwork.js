import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditArtwork() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setIsLoggedIn(false);

    const fetchArtwork = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/artworks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { title, description, price, imageUrl } = res.data;
        setTitle(title);
        setDescription(description);
        setPrice(price);
        setPreview(imageUrl);
        setInitialLoading(false);
      } catch (err) {
        console.error(err);
        alert('Failed to load artwork.');
        setInitialLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleImageUpload = async () => {
    if (!imageFile) return preview;

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

      await axios.put(
        `http://localhost:5000/api/artworks/${id}`,
        { title, description, price, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Artwork updated successfully!');
      navigate('/artgallery');
    } catch (err) {
      console.error(err);
      alert('Update failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in to delete artwork.');

    try {
      await axios.delete(`http://localhost:5000/api/artworks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Artwork deleted!');
      navigate('/artgallery');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete artwork.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="upload-warning">
        ⚠️ Please login to edit your artwork.
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="loading-container">
        Loading artwork...
      </div>
    );
  }

  return (
    <>
      <div className="upload-wrapper">
        <div className="upload-container">
          <h2 className="upload-header">🖌️ Edit Your Artwork</h2>
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
              <label>Change Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}

            <button type="submit" disabled={loading} className="neon-btn">
              {loading ? 'Updating...' : '💾 Save Changes'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
              >
                🗑️ Delete Artwork
              </button>
            </div>
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
          padding: 35px;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
          width: 100%;
          max-width: 500px;
          border: 2px solid #00e0ff33;
          transition: 0.3s ease;
          min-height: 60vh;
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
          color: #00ffe5;
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
          background: #00ffe5;
          color: #000;
          border: none;
          border-radius: 12px;
          box-shadow: 0 0 10px #00ffe5, 0 0 20px #00ffe5;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 2%;
        }

        .neon-btn:hover {
          background: #00b5a1;
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

        .delete-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #ff3333;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
          transition: background 0.3s ease;
        }

        .delete-button:hover {
          background-color: #cc0000;
        }

        .loading-container {
          color: #00fff7;
          font-size: 1.4rem;
          text-align: center;
          margin-top: 10%;
        }
      `}</style>
    </>
  );
}
