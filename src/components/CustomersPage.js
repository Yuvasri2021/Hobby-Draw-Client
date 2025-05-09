import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/customers', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setCustomers(res.data))
    .catch(err => console.error('Failed to fetch customers', err));
  }, []);

  return (
    <div className="admin-page">
      <h2>👤 All Customers</h2>
      {customers.map((customer, i) => (
        <div key={i} className="customer-card">
          <h3>{customer.name}</h3>
          <p>Email: {customer.email}</p>
          <p>Orders: {customer.orders.length}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomersPage;
