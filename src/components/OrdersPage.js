import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error('Failed to fetch orders', err));
  }, []);

  return (
    <div className="admin-page">
      <h2>🛒 All Orders</h2>
      <div className="order-list">
        {orders.map((order, i) => (
          <div key={i} className="order-card">
            <h4>Order ID: {order._id}</h4>
            <p>Customer: {order.customerName}</p>
            <p>Status: {order.status}</p>
            <h5>Items:</h5>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>{item.title} - ₹{item.price}</li>
              ))}
            </ul>
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
