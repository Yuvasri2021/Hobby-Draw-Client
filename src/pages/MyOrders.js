import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('Could not delete the order.');
    }
  };

  if (loading) return <div className="text-center p-8 text-cyan-400 text-xl">🌟 Loading your masterpieces...</div>;

  if (!isLoggedIn) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">🚫 Please login to view your orders.</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-300">🖼️ No orders yet. Start collecting art!</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white relative z-10">
      <h2 className="text-4xl font-extrabold text-cyan-400 mb-8 drop-shadow-glow text-center py-8" style={{ textAlign: 'center', color: '#2d3436', textShadow: '0 0 6px #00fff7, 0 0 10px #00fff7', fontSize: '35px' }}>
        🧾 My Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="order-card mb-10 p-4 transition-transform duration-100 hover:scale-[1.01]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            <p className="text-sm text-gray-300" style={{ color: 'white' }}>
              🗓️ Placed on:{' '}
              <span className="text-cyan-300 font-medium">
                {new Date(order.placedAt || order.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </p>
            <button
              onClick={() => handleDelete(order._id)}
              className="px-3 py-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
            >
              ❌ Delete Order
            </button>
          </div>

          <div className="order-grid">
            {order.items.map((item, index) => (
              <div key={index} className="art-card">
                <div className="image-wrapper">
                  <img
                    src={`http://localhost:5000${item.imageUrl}`}
                    alt={item.title}
                    className="artwork-image"
                  />
                </div>
                <div className="order-info">
                  <h3 className="artwork-title">{item.title}</h3>
                  <p className="order-detail">💰 ₹{Number(item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: black;
        }

        .order-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          margin: 5%;
        }

        .order-card:hover {
          transform: translateY(-5px);
          border: 2px solid aqua;
          box-shadow: 0 20px 40px rgba(0,255,255,0.2);
        }

        .order-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 1rem;
        }

        .art-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .art-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 255, 255, 0.25);
          border: 2px solid #00ffff99;
        }

        .image-wrapper {
          overflow: hidden;
          border-radius: 15px;
          margin-bottom: 0.5rem;
        }

        .artwork-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 15px;
          transition: transform 0.3s ease;
        }

        .art-card:hover .artwork-image {
          transform: scale(1.05);
        }

        .artwork-title {
          font-size: 1rem;
          font-weight: 600;
          color: #a3e4ff;
          margin-bottom: 0.25rem;
        }

        .order-detail {
          font-size: 0.9rem;
          color: #e0e0e0;
        }
      `}</style>
    </div>
  );
}
