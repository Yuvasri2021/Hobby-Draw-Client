import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ArtDetails() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [isSold, setIsSold] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/artworks/${id}`)
      .then(res => {
        setArt(res.data);
        setIsSold(res.data.sold);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleBuy = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/orders', { artworkId: id }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Order placed successfully!');
      setIsSold(true);
    } catch (err) {
      alert('Order failed');
    }
  };

  if (!art) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <img src={`http://localhost:5000${art.image}`} alt={art.title} className="w-full h-60 object-cover rounded" />
      <h2 className="text-3xl font-bold mt-4">{art.title}</h2>
      <p className="mt-2">{art.description}</p>
      <p className="mt-2 font-semibold">₹{art.price}</p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleBuy}
        disabled={isSold}
      >
        {isSold ? 'Sold' : 'Buy'}</button>
    </div>
  );
}