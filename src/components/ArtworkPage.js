import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtworksPage = () => {
  const [artworks, setArtworks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/artworks', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setArtworks(res.data))
    .catch(err => console.error('Failed to fetch artworks', err));
  }, []);

  return (
    <div className="admin-page">
      <h2>🖼️ All Artworks</h2>
      <div className="grid">
        {artworks.map((art, i) => (
          <div key={i} className="card">
            <img src={art.imageUrl} alt={art.title} />
            <h4>{art.title}</h4>
            <p>Artist: {art.artistName}</p>
            <p>Price: ₹{art.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworksPage;
