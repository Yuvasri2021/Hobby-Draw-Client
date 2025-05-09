import React from 'react';

export default function NotAuthorized() {
  return (
    <div style={{
      padding: '4rem',
      textAlign: 'center',
      color: '#ff4d4d',
      fontSize: '1.5rem',
      backgroundColor: '#1a1a1a',
      borderRadius: '12px',
      margin: '5% auto',
      maxWidth: '600px',
      boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)'
    }}>
      ❌ Access Denied: You are not authorized to view this page.
    </div>
  );
}
