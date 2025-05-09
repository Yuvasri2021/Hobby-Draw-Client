import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/artists', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setArtists(res.data))
    .catch(err => console.error('Failed to fetch artists', err));
  }, []);

  return (
    <div className="admin-page">
      <h2>👩‍🎨 All Artists</h2>
      {artists.map((artist, i) => (
        <div key={i} className="artist-card">
          <h3>{artist.name}</h3>
          <p>Email: {artist.email}</p>
          <h5>Uploaded Artworks:</h5>
          <div className="grid">
            {artist.artworks.map((art, j) => (
              <div key={j} className="card">
                <img src={art.imageUrl} alt={art.title} />
                <p>{art.title} - ₹{art.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistsPage;
