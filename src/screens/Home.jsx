// src/screens/Home.jsx
import React, { useState } from "react";
import ProductList from "../components/ProductList";
import AddProductModal from "../components/AddProductModal";
import Button from '@mui/material/Button';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-container" style={{margin:"10px"}}>
      <h1 style={{textAlign:"center"}}>Homble Assesment</h1>
      <Button variant="contained" onClick={openModal} style={{margin:"15px"}}>Add Product</Button>
      <ProductList />
      {isModalOpen && <AddProductModal onClose={closeModal} />}
    </div>
  );
};

export default Home;
