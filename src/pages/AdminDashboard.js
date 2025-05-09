import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalOrders: 0,
    totalArtists: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Use navigate for redirection
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, [navigate, token]); // Pass navigate in the dependency array

  const cards = [
    { label: 'Total Artworks', count: stats.totalArtworks, icon: '🖼️', bg: 'bg-primary' },
    { label: 'Total Orders', count: stats.totalOrders, icon: '🛒', bg: 'bg-success' },
    { label: 'Registered Artists', count: stats.totalArtists, icon: '👩‍🎨', bg: 'bg-info' },
    { label: 'Total Customers', count: stats.totalCustomers, icon: '👤', bg: 'bg-secondary' },
    { label: 'Total Revenue', count: `₹${stats.totalRevenue}`, icon: '💰', bg: 'bg-warning' },
    { label: 'Pending Orders', count: stats.pendingOrders, icon: '📦', bg: 'bg-danger' },
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <style>{`
        body {
          margin: 0;
          background: linear-gradient(to right, #141e30, #243b55);
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        #sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 250px;
          background: rgba(30, 60, 114, 0.8);
          backdrop-filter: blur(15px);
          color: white;
          padding-top: 20px;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
          z-index: 999;
        }

        #sidebar .menu {
          list-style: none;
          padding: 0;
          margin: 20px 0;
        }

        #sidebar .menu li {
          padding: 15px 25px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          border-radius: 10px;
        }

        #sidebar .menu li:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        #sidebar .menu li a {
          color: white;
          text-decoration: none;
          display: block;
        }

        #main-wrapper {
          margin-left: 250px;
          padding: 30px;
        }

        .dashboard-header {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .dashboard-container {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          justify-content: center;
        }

        .dashboard-card {
          width: 280px;
          padding: 25px;
          border-radius: 15px;
          text-align: center;
          font-weight: bold;
          color: white;
          backdrop-filter: blur(15px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          position: relative;
          transition: all 0.3s ease-in-out;
          overflow: hidden;
        }

        .dashboard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(255, 255, 255, 0.4);
        }

        .dashboard-card .icon {
          font-size: 50px;
          margin-bottom: 12px;
          transition: transform 0.2s ease-in-out;
        }

        .dashboard-card:hover .icon {
          transform: rotate(5deg);
        }

        .dashboard-card .count {
          font-size: 40px;
          text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
        }

        .dashboard-card .label {
          font-size: 18px;
          opacity: 0.9;
        }

        .dashboard-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
          transform: rotate(45deg);
          transition: all 0.5s ease-in-out;
        }

        .dashboard-card:hover::before {
          top: -30%;
          left: -30%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
        }

        .bg-primary { background-color: rgba(0, 123, 255, 0.2); }
        .bg-success { background-color: rgba(40, 167, 69, 0.2); }
        .bg-info    { background-color: rgba(23, 162, 184, 0.2); }
        .bg-secondary { background-color: rgba(108, 117, 125, 0.2); }
        .bg-warning { background-color: rgba(255, 193, 7, 0.2); }
        .bg-danger  { background-color: rgba(220, 53, 69, 0.2); }

        @media (max-width: 900px) {
          #sidebar {
            width: 200px;
          }

          #main-wrapper {
            margin-left: 200px;
          }

          .dashboard-card {
            width: 90%;
          }
        }
      `}</style>

      <aside id="sidebar">
        <h2 style={{ textAlign: 'center', padding: '10px' }}>🎨 Art Admin</h2>
        <ul className="menu">
          <li><a href="/admin">📊 Dashboard</a></li>
          <li><a href="/artworks">🖼️ Artworks</a></li>
          <li><a href="/orders">🛒 Orders</a></li>
          <li><a href="/artists">👩‍🎨 Artists</a></li>
          <li><a href="/customers">👤 Customers</a></li>
        </ul>
      </aside>

      <div id="main-wrapper">
        <div className="dashboard-header">
          <h2>📊 Dashboard Overview</h2>
        </div>

        <div className="dashboard-container">
          {cards.map((card, idx) => (
            <div className={`dashboard-card ${card.bg}`} key={idx}>
              <div className="icon">{card.icon}</div>
              <div className="count">{card.count}</div>
              <div className="label">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
