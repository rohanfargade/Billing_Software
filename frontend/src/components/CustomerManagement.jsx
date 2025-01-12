import React, { useState, useEffect } from 'react';
import { addCustomer, getCustomers } from '../services/apiServices'; 

function CustomerManagement() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [error, setError] = useState(null); 
  const [isContactError, setIsContactError] = useState(false); 


  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      setError('Failed to fetch customers. Please try again later.');
    }
  };

  const saveCustomer = async (customer) => {

      try {
        const data = await addCustomer(customer);
        if (data) {
          fetchCustomers();
        }
  
      } catch (error) {
        setError('Failed to fetch customers. Please try again later.');
      }
    
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = { name, gender, contact, email };
    if(!isContactError){
    saveCustomer(newCustomer);

    setName('');
    setGender('');
    setContact('');
    setEmail('');

    setShowForm(false);
    }
  };

  const validateContact = (value) => {
    const regex = /^[789]\d{9}$/;
    if (regex.test(value)) {
      setIsContactError(false);
    } else {
      setIsContactError(true);
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    setContact(value);
    validateContact(value);
  };

  return (
    <div style={styles.container}>
      {isContactError && <p style={styles.error}>Invalid contact number. Must start with 7, 8, or 9 and be 10 digits long.</p>}
      <div style={styles.headerContainer}>
        <h3 style={styles.subtitle}>Customers List</h3>
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={styles.addButton}>
            Add Customer
          </button>
        )}
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
            style={styles.input}
          />
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
            style={styles.input}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input 
            type="text" 
            placeholder="Contact" 
            value={contact}
            onChange={handleContactChange} 
            required
            style={styles.input}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
            style={styles.input}
          />
          <button onClick={() => setShowForm(false)} style={styles.button}>Cancel</button>

          <button type="submit" style={styles.button}>Save</button>

        </form>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Gender</th>
              <th style={styles.tableHeader}>Contact</th>
              <th style={styles.tableHeader}>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{customer.name}</td>
                  <td style={styles.tableCell}>{customer.gender}</td>
                  <td style={styles.tableCell}>{customer.contact}</td>
                  <td style={styles.tableCell}>{customer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.emptyRow}>No customers added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    borderRadius: '4px',
    backgroundColor: '#4d4d4d',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  addButton: {
    padding: '8px 16px', 
    borderRadius: '4px',
    backgroundColor: '#4d4d4d', 
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px', 
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '20px', 
  },
  tableContainer: {
    marginTop: '20px',
    position: 'relative', 
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    borderRadius: '8px', 
    overflow: 'hidden',
    backgroundColor: '#f7f7f7', 
  },
  tableHeaderRow: {
    backgroundColor: '#d3d3d3', 
    color: '#333',
  },
  tableHeader: {
    padding: '12px',
    borderBottom: '2px solid #dee2e6',
    borderRight: '1px solid #dee2e6', 
    textAlign: 'center', 
    fontSize: '16px',
  },
  tableRow: {
    backgroundColor: '#f8f9fa',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    borderRight: '1px solid #dee2e6', 
    fontSize: '14px',
    color: '#555',
    textAlign: 'center', 
  },
  emptyRow: {
    textAlign: 'center',
    padding: '12px',
    color: '#999',
  },
};

export default CustomerManagement;
