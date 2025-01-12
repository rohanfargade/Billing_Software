import React, { useEffect, useState } from 'react';
import { getCustomers, getProducts, createBill, getAllBills } from '../services/apiServices';

function BillingSystem() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [billProducts, setBillProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchAllBills();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchAllBills = async () => {
    try {
      const data = await getAllBills();
      setBills(data);
    } catch (error) {
      console.error('Error fetching all bills:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productData = await getProducts();
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = (e) => {
    const productId = selectedProduct;
    const product = products.find(p => p._id === productId); 
    if (product) {
      const existingProduct = billProducts.find(bp => bp.id === product._id);
      const quantity = parseInt(productQuantity);

      if (!existingProduct) {
        setBillProducts([...billProducts, { ...product, quantity }]);
      } else {
        const updatedProducts = billProducts.map(bp => 
          bp.id === product._id ? { ...bp, quantity } : bp
        );
        setBillProducts(updatedProducts);
      }
      
      setTotalAmount(totalAmount + (product.price * quantity));
    }
  };

  const handleEditProduct = (index) => {
    const product = billProducts[index];
    setSelectedProduct(product._id);
    setProductQuantity(product.quantity);
    const updatedProducts = billProducts.filter((_, i) => i !== index);
    setBillProducts(updatedProducts);
  };
  
  const handleDeleteProduct = (index) => {
    const updatedProducts = billProducts.filter((_, i) => i !== index);
    setBillProducts(updatedProducts);
    const total = updatedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    setTotalAmount(total);
  };
  

  const handleSubmitBill = async (e) => {
    e.preventDefault();
  

    const customer = customers.find(cust => cust._id === selectedCustomer);
    const newBill = {
      customer: customer._id, 
      products: billProducts.map(product => ({ product: product._id, quantity: product.quantity, price: product.price })),
      totalAmount,
    };

    try {
      const savedBill = await createBill(newBill); 
  
      if (savedBill) {
        fetchAllBills();
      }

      setSelectedCustomer('');
      setSelectedProduct('');
      setProductQuantity(1);
      setBillProducts([]);
      setTotalAmount(0);
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };
  


  const handleEditBill = (index) => {
    const bill = bills[index];
    setSelectedCustomer(bill.customer);
    setBillProducts(bill.products);
    setTotalAmount(bill.totalAmount);
    setEditingIndex(index);
  };

  const handleDeleteBill = (index) => {
    const updatedBills = bills.filter((_, i) => i !== index);
    setBills(updatedBills);
  };

  return (
    <div style={styles.container}>
      <h2>Billing System</h2>

      <form onSubmit={handleSubmitBill} style={styles.form}>
        <select 
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          style={styles.input}
          required
        >
          <option value="" disabled>Select Customer</option>
          {customers.map(customer => (
            <option key={customer._id} value={customer._id}>{customer.name}</option>
          ))}
        </select>

        <select 
          value={selectedProduct} 
          onChange={(e) => setSelectedProduct(e.target.value)} 
          style={styles.input} 
          required
        >
          <option value="" disabled>Select Product to Bill</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>{product.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder='quantity'
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          min="1"
          style={styles.input}
          required
        />

        <button type="button" onClick={handleAddProduct} style={styles.button}>
          Add Product
        </button>

        <h4>Selected Products:</h4>
<table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.tableHeader}>Product Name</th>
      <th style={styles.tableHeader}>Price</th>
      <th style={styles.tableHeader}>Quantity</th>
      <th style={styles.tableHeader}>Total Amount</th>
      <th style={styles.tableHeader}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {billProducts.map((product, index) => (
      <tr key={index}>
        <td style={styles.tableCell}>{product.name}</td>
        <td style={styles.tableCell}>${product.price}</td>
        <td style={styles.tableCell}>{product.quantity}</td>
        <td style={styles.tableCell}>${(product.price * product.quantity).toFixed(2)}</td>
        <td style={styles.tableCell}>
          <button onClick={() => handleEditProduct(index)} style={styles.editButton}>Edit</button>
          <button onClick={() => handleDeleteProduct(index)} style={styles.deleteButton}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        <h4>Total Amount: ₹{totalAmount}</h4>
        <button type="submit" style={styles.button}>
          {editingIndex !== null ? 'Update Bill' : 'Save Bill'}
        </button>
      </form>

      <div style={styles.listContainer}>
  <h3>Bills List</h3>
  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.tableHeader}>Customer Name</th>
        <th style={styles.tableHeader}>Total Amount</th>
        <th style={styles.tableHeader}>Products</th>
      </tr>
    </thead>
    {/* <tbody>
      {bills.map((bill, index) => (
        <tr key={index}>
          <td style={styles.tableCell}>{bill.customer.name}</td>
          <td style={styles.tableCell}>₹{bill.totalAmount}</td>
          <td style={styles.tableCell}>
            <ul style={styles.productList}>
              {bill.products.map((product, idx) => (
                <li key={idx}>
                  {product.product.name} - Quantity: {product.quantity} - Price: ₹{product.price}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      ))}
    </tbody> */}

<tbody>
  {bills.map((bill, index) => (
    <tr key={index}>
      <td style={styles.tableCell}>{bill.customer ? bill.customer.name : 'Unknown Customer'}</td>
      <td style={styles.tableCell}>₹{bill.totalAmount}</td>
      <td style={styles.tableCell}>
        <ul style={styles.productList}>
          {bill.products.map((product, idx) => (
            <li key={idx}>
              {product.product ? product.product.name : 'Unknown Product'} - Quantity: {product.quantity} - Price: ₹{product.price}
            </li>
          ))}
        </ul>
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
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f4f4f4',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '10px',
  },
  productList: {
    listStyleType: 'none',
    paddingLeft: '0',
    margin: '0',
  }
};

export default BillingSystem;
