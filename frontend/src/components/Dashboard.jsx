import React, { useState, useEffect } from 'react';
import { getSalesAndRevenue } from '../services/apiServices';

function Dashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
      
    try {
      const response = await getSalesAndRevenue(); 
      setTotalSales(response.totalSales);
      setTotalRevenue(response.totalRevenue);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.card}>
        <h3>Total Sales</h3>
        <p>{totalSales}</p> 
      </div>

      <div style={styles.card}>
        <h3>Total Revenue</h3>
        <p>₹ {totalRevenue}</p> 
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    gap: '20px',
  },
  card: {
    width: '200px',
    padding: '20px',
    backgroundColor: '#f8f9fa', 
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};

export default Dashboard;
