import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/apiServices'; 
import AddEditProduct from './AddEditProduct';

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditProduct, setIsEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchProducts = async () => {
    try {
      const productData = await getProducts();
      setProducts(productData); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const saveOrUpdateProduct = (productDetails) => {
    if (isEditProduct) {
      setIsEditProduct(false);
      setShowForm(false);
      updateProductDetails(productDetails);
    } else {
      setIsEditProduct(false);
      setShowForm(false);
      delete productDetails._id;
      saveProduct(productDetails);
    }
  };

  const saveProduct = async (productDetails) => {
    try {
      await addProduct(productDetails); 
      setProducts([...products, productDetails]); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProductDetails = async (productDetails) => {
    try {
      const response = await updateProduct(productDetails); 
      if (response) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEdit = (index) => {
    const product = products[index];
    setSelectedProduct(product);
    setIsEditProduct(true);
    setShowForm(true); 
  };

  const handleDelete = async (index) => {
    try {
      const product = products[index];
      const response = await deleteProduct(product._id); 
      if (response) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h3 style={styles.productListTitle}>Products List</h3>
        <button onClick={() => setShowForm(true)} style={styles.addButton}>
          Add Product
        </button>
      </div>

      {showForm && (
        <AddEditProduct
          isEdit={isEditProduct ? true : false}
          productDetails={selectedProduct}
          saveProduct={saveOrUpdateProduct}
        />
      )}

      <div style={styles.listContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.tableHeader}>Product Name</th>
              <th style={styles.tableHeader}>Price</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Brand</th>
              <th style={styles.tableHeader}>Supplier</th>
              <th style={styles.tableHeader}>Old Stock</th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{product.name}</td>
                <td style={styles.tableCell}>₹{product.price}</td>
                <td style={styles.tableCell}>{product.quantity}</td>
                <td style={styles.tableCell}>{product.brand}</td>
                <td style={styles.tableCell}>{product.supplier}</td>
                <td style={styles.tableCell}>{product.oldStock}</td>
                <td style={styles.tableCell}>{product.category}</td>
                <td style={styles.tableCell}>
                  <button onClick={() => handleEdit(index)} style={styles.smallButton}>Edit</button>
                  <button onClick={() => handleDelete(index)} style={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: '20px',
  },
  productListTitle: {
    fontSize: '20px',
    margin: '0',
  },
  addButton: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#4e4e4e', 
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  listContainer: {
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeaderRow: {
    backgroundColor: '#d3d3d3',
  },
  tableHeader: {
    padding: '10px',
    borderBottom: '2px solid #dee2e6',
    borderRight: '1px solid #dee2e6',
    textAlign: 'center',
    fontSize: '14px',
  },
  tableRow: {
    backgroundColor: '#f8f9fa',
  },
  tableCell: {
    padding: '8px',
    borderBottom: '1px solid #dee2e6',
    borderRight: '1px solid #dee2e6',
    textAlign: 'center',
    fontSize: '12px', 
  },
  smallButton: {
    marginLeft: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '4px 8px', 
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '12px',
  },
  deleteButton: {
    marginLeft: '5px',
    backgroundColor: '#ff4d4d', 
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '12px',
  },
};

export default InventoryManagement;
