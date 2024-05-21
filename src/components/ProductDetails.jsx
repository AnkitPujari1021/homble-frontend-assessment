// src/components/ProductDetails.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import "./ProductDetails.css";
const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`/products/${id}`);
  const [expanded, setExpanded] = useState({ description: true, allergens: true, usage: true });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong.</div>;

  const toggleExpand = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <h1>{product.name}</h1>
        <p>Price: INR {product.selling_price}</p>

        <div>
          <h2 onClick={() => toggleExpand('description')}>Description</h2>
          {expanded.description && <p>{product.description}</p>}
        </div>

        <div>
          <h2 onClick={() => toggleExpand('allergens')}>Allergen Info</h2>
          {expanded.allergens && <p>{product.allergen_info}</p>}
        </div>

        <div>
          <h2 onClick={() => toggleExpand('usage')}>Usage Instructions</h2>
          {expanded.usage && <p>{product.cooking_instruction}</p>}
        </div>
      </div>
      <div className="product-details-image"><img src={product.productImage} alt={product.name} /></div>
    </div>
  );
};

export default ProductDetails;
