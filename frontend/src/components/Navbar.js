import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        🎓 Student Record Manager
      </div>
      <div style={styles.right}>
        <span style={styles.welcome}>
          👋 Welcome, {user?.name}
        </span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 100%)',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  brand: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: '700',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  welcome: {
    color: '#fff',
    fontSize: '14px',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.4)',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};

export default Navbar;