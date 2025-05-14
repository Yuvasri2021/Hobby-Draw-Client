import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data.user) {
          setError('Profile not found.');
        } else {
          const userData = res.data.user;
          setUser(userData);
          setFormData({
            name: userData.name,
            email: userData.email,
            role: userData.role,
          });
          setUploadedCount(res.data.uploadedCount || 0);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        'http://localhost:5000/api/auth/update-profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setEditing(false);

      if (formData.role === 'artist') {
        const res2 = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUploadedCount(res2.data.uploadedCount || 0);
      } else {
        setUploadedCount(0);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Error updating profile.');
    }
  };

  if (loading) return <div className="loading">⏳ Loading profile...</div>;
  if (error) return (
    <div className="profile-container">
      <style>{profileStyles}</style>
      <div className="error">{error}</div>
    </div>
  );
  if (!user) return null;

  return (
    <div className="profile-container">
      <style>{profileStyles}</style>
      <div className="profile-card">
        <h2 className="title">👤 Profile</h2>

        {editing ? (
          <>
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            /><br />

            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            /><br />

            <label>Role:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="customer">Customer</option>
              <option value="artist">Artist</option>
            </select><br />

            <button className="edit-btn" onClick={handleSave}>✅ Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {user.role === 'artist' && (
              <p><strong>Artworks Uploaded:</strong> {uploadedCount}</p>
            )}
            <button className="edit-btn" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          </>
        )}
      </div>

      <button onClick={handleLogout} className="logout-btn">🔓 Logout</button>
    </div>
  );
}

const profileStyles = `
.profile-container {
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  color: #f5f6fa;
  text-align: center;
  border: 2px solid #00ffff99;
  border-radius: 25px;
  background: #000000;
}

.profile-container:hover {
  box-shadow: 0 12px 24px rgba(0, 255, 255, 0.25);
}

.profile-card {
  background: #2f3640;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0,255,255,0.1);
}

.profile-card input, .profile-card select {
  padding: 10px;
  margin: 8px 0;
  width: 80%;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.title {
  font-size: 28px;
  margin-bottom: 1rem;
  color: #00fff7;
  text-shadow: 0 0 6px #00fff7;
}

.logout-btn, .edit-btn {
  margin-top: 1rem;
  padding: 10px 25px;
  background: rgb(22, 171, 194);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.logout-btn:hover {
  background: rgb(194, 71, 22);
}
.edit-btn:hover {
  background: rgb(61, 132, 255);
}

.loading {
  font-size: 20px;
  color: #00a8ff;
  text-align: center;
}

/* Enhanced Error Styling */
.error {
  font-size: 18px;
  color: #ff6b81;
  font-weight: bold;
  text-align: center;
  margin: 20px auto;
  padding: 15px 25px;
  background-color: #2f2f2f;
  border: 2px solid #ff6b81;
  border-radius: 12px;
  width: fit-content;
  max-width: 80%;
  box-shadow: 0 0 15px rgba(255, 107, 129, 0.4);
  animation: fadeInPop 0.4s ease-out;
}

@keyframes fadeInPop {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
`;
