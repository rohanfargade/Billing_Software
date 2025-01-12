import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; 
  }
};



export const addCustomer = async (customer) => {
    try {
      const response = await axios.post(`${API_URL}/customers`, customer);
      return response.data; 
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  };

export const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

export const addProduct = async (product) => {
    try {
      const response = await axios.post(`${API_URL}/products`, product); 
      return response.data; 
    } catch (error) {
      console.error('Error adding product:', error);
      throw error; 
    }
  };

export const updateProduct = async (updatedProduct) => {
    try {
        console.log('updatedProduct: ', updatedProduct);
      const response = await axios.put(`${API_URL}/products/${updatedProduct._id}`, updatedProduct);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

export const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${productId}`); 
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };


export const createBill = async (billData) => {
  try {
    const response = await axios.post(`${API_URL}/bills`, billData);
    return response.data; 
  } catch (error) {
    console.error('Error creating bill:', error);
    throw error;
  }
};

export const getAllBills = async () => {
  try {
    const response = await axios.get(`${API_URL}/bills`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching all bills:', error);
    throw error; 
  }
};

export const getSalesAndRevenue = async () => {
  try {
    const response = await axios.get(`${API_URL}/bills/totalsales-revenue`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching total sales and revenue :', error);
    throw error; 
  }
};

