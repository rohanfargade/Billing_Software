import React from 'react';
import { FaBell } from 'react-icons/fa'; 
import { FaUserCircle } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>

      <div style={styles.searchBar}>
        <input 
          type="text" 
          placeholder="Search..." 
          style={styles.searchInput}
        />
      </div>


      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>Dashboard</Link>
      <Link to="/customer" style={{ textDecoration: 'none', color: 'black' }}>Customer</Link>
      <Link to="/inventory" style={{ textDecoration: 'none', color: 'black' }}>Inventory</Link>
      <Link to="/billing" style={{ textDecoration: 'none', color: 'black' }}>Billing</Link>

      <div style={styles.rightSection}>
        <div style={styles.notification}>
          <FaBell size={18} />
          <span style={styles.notificationCount}>3</span>
        </div>

        <div style={styles.profile}>
          <FaUserCircle size={24} />
          <span style={styles.profileName}>Rohan</span>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 15px',
    backgroundColor: '#fff', 
    color: '#000', 
    borderRadius: '8px', 
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd', 
  },
  searchBar: {
    flex: 1,
    maxWidth: '200px',
  },
  searchInput: {
    width: '100%',
    padding: '6px',
    borderRadius: '4px', 
    border: '1px solid #ccc', 
    outline: 'none',
    fontSize: '14px',
    color: '#000', 
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  notification: {
    position: 'relative',
    cursor: 'pointer',
    color: '#000', 
  },
  notificationCount: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 4px',
    fontSize: '10px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#000', 
  },
  profileName: {
    marginLeft: '6px',
    fontSize: '14px',
  },
};

export default Navbar;
