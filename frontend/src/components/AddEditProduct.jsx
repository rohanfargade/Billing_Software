import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function AddEditProduct({isEdit, productDetails, saveProduct}) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        brand: '',
        supplier: '',
        oldStock: '',
        category: '',
        _id: ''
      });

      useEffect(() => {
        if (isEdit && productDetails) {
          setFormData({
            name: productDetails.name || '',
            price: productDetails.price || '',
            quantity: productDetails.quantity || '',
            brand: productDetails.brand || '',
            supplier: productDetails.supplier || '',
            oldStock: productDetails.oldStock || '',
            category: productDetails.category || '',
            _id: productDetails._id || ''
          });
        }
      }, [isEdit, productDetails]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
console.log('formData: ',formData);
        saveProduct(formData);
      };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            placeholder="Product Name" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <input 
            type="number" 
            placeholder="Product Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange} 
            required
            style={styles.input}
          />
          <input 
            type="number" 
            placeholder="Product Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange} 
            required
            style={styles.input}
          />
          <input 
            type="text" 
            placeholder="Product Brand" 
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <input 
            type="text" 
            placeholder="Product Supplier" 
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange} 
            required
            style={styles.input}
          />
          <input 
            type="number" 
            placeholder="Old Stock" 
            name="oldStock"
            value={formData.oldStock}
            onChange={handleInputChange} 
            required
            style={styles.input}
          />
          <input 
            type="text" 
            placeholder="Product Category" 
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isEdit ? 'Update Product' : 'Save Product'}
          </button>
        </form>
  )
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  listContainer: {
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  editButton: {
    marginLeft: '10px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  deleteButton: {
    marginLeft: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

AddEditProduct.propTypes = {
    isEdit: PropTypes.bool,
    productDetails: PropTypes.object,
    saveProduct: PropTypes.func
}

export default AddEditProduct;