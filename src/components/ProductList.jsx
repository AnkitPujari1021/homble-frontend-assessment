// src/components/ProductList.jsx
import React, { useEffect, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
 
  const { data: products, loading, error } = useFetch('/products');
  
  const sortedProducts = useMemo(() => {
    return products ? products.sort((a, b) => a.selling_price - b.selling_price) : [];
  }, [products]);

  if (loading) return <div className="skeleton">Loading...</div>;
  if (error) return <div>Something went wrong.</div>;

  return (
    <div className="product-grid">
      {sortedProducts.map(product => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-tile">
          <h3>{product.name}</h3>
          <div className="product-image">
            <img src={product.productImage} alt={product.name} />
          </div>
          <p>Price: INR {product.selling_price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
