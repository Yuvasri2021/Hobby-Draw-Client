import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [orderMessage, setOrderMessage] = useState('');
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      setOrderMessage('Cart is empty or not loaded properly.');
      return;
    }

    const items = cartItems.map((item) => ({
      artwork: item._id,
    }));

    try {
      await axios.post(
        'http://localhost:5000/api/orders/place',
        { items },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOrderMessage('✅ Order placed successfully!');
      clearCart();
      setTimeout(() => navigate('/my-orders'), 1000);
    } catch (err) {
      setOrderMessage(`❌ Order failed: ${err.response?.data?.message || 'Server error'}`);
    }
  };

  return (
    <div className={`min-h-screen p-6 bg-black text-white relative overflow-hidden ${fadeIn ? 'fade-in' : ''}`}>
      {/* Particle Background */}
      <div className="particle-bg absolute top-0 left-0 w-full h-full -z-10"></div>

      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 via-gray-500 to-aqua-500 text-transparent bg-clip-text animate-gradient" style={{textAlign:'center',color:' #2d3436',
      textShadow:'0 0 6px #00fff7, 0 0 10px #00fff7',fontSize:'35px'}}>
        🎨 Your Art Cart
      </h1>

      {orderMessage && (
        <p className="text-center text-yellow-400 bg-white/10 p-3 rounded-md shadow-lg mb-4 max-w-xl mx-auto">
          {orderMessage}
        </p>
      )}

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-10"  style={{color:'white',fontSize:'25px',textAlign:'center',marginTop:'15%'}}>🖼️ Your cart is empty.</p>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-item-card flex items-center justify-between p-4 rounded-xl backdrop-blur-lg border border-cyan-400/20 bg-white/5 hover:bg-white/10 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.title}
                  className="rounded-lg border border-cyan-400/30 shadow-inner"
                  width="200px"
                  height="150px"
                  style={{border:'1px solid black',padding:'2%',borderRadius:'5%',background:'rgba(255, 255, 255, 0.15)'}}
                />
                <div>
                  <h2 className="font-semibold text-cyan-200">{item.title}</h2>
                  <p className="text-sm text-gray-300">₹{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 bg-red-900/30 px-3 py-1 rounded-full text-sm hover:bg-red-700/50 transition hover:scale-105"
              >
                ✖ Remove
              </button>
            </div>
          ))}

          <div className="total-bar flex justify-between items-center mt-8 p-4 rounded-xl bg-white/10 border border-cyan-600/40 shadow-lg backdrop-blur">
            <h3 className="text-lg font-bold text-cyan-300">Total:
            <span className="text-lg font-semibold text-gray-100">
              ₹{cartItems.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(2)}
            </span></h3>
         

          <button
            onClick={handlePlaceOrder}
            className="place-order-btn w-full mt-5 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            🚀 Place Order
          </button>
          </div>
        </div>
      )}

      {/* 🌟 Custom CSS */}
      <style>{`
        body {
          background: black;
        }

        .fade-in {
          animation: fadeIn 1s ease-in;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 5s ease infinite;
        }

        .particle-bg {
          background: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0),
                      radial-gradient(circle at 4px 4px, rgba(255, 255, 255, 0.03) 1px, transparent 0);
          background-size: 20px 20px;
          opacity: 0.3;
          animation: pulse 6s infinite ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .cart-item-card
       {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width:200px;
          display:inline-block;
          margin-left:2%;
          padding:2%;
          margin-top:2%;
        }

        .cart-item-card:hover {
          border: 2px solid rgba(0, 255, 255, 0.4);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2);
          transform: translateY(-4px) scale(1.02);
        }

        .cart-item-card img {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cart-item-card img:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .total-bar{
          transform: scale(1.01);
          color:white;
            border:1px solid black;
        margin-top:2%;
        margin-left:3%;
        margin-right:88%;
        padding:1%;
        background:rgba(255, 255, 255, 0.15);
        }

        .total-bar:hover{
         border: 2px solid rgba(0, 255, 255, 0.4);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2);
          transform: translateY(-4px) scale(1.02);
          }

        .place-order-btn {
          position: relative;
          overflow: hidden;
          margin-left:15%;
        }

        
        .place-order-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.3) 100%
          );
          transform: skewX(-20deg);
          transition: left 0.75s ease-in-out;
        }

        .place-order-btn:hover::before {
          left: 130%;
        }
       
        .place-order-btn:hover::hover{
          border: 2px solid rgba(0, 255, 255, 0.4);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2);
          transform: translateY(-4px) scale(1.02);
        }

        h1 {
          text-shadow: 0 0 5px cyan, 0 0 10px blue, 0 0 20px purple;
        }

        .cart-item-card,
        .total-bar,
        button {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
