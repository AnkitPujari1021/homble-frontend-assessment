// src/components/AddProductModal.jsx
import React, { useState } from 'react';
import { postRequest } from '../axios';
import './AddProductModal.css';
import Button from '@mui/material/Button';
const AddProductModal = ({ onClose }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productAllergens, setProductAllergens] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postRequest('/products', {
        name: productName,
        description: productDescription,
        allergens: productAllergens,
      });
      
      // console.log('Product added:', productName);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Product Allergen Info</label>
            <input type="text" value={productAllergens} onChange={(e) => setProductAllergens(e.target.value)} required />
          </div>
            <div style={{display:"flex",gap:"1rem"}}>
          <Button variant="contained" type="submit">ADD</Button>
          <Button variant="contained" onClick={onClose}>CLOSE</Button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default AddProductModal;
