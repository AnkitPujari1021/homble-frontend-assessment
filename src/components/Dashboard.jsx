// src/components/Dashboard.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import './Dashboard.css';
import Button from '@mui/material/Button';

const Dashboard = () => {
  const { data, loading, error } = useFetch('/dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];

    return sortableProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery)
    );
  }, [products, searchQuery]);

  const handleRemove = id => {
    setProducts(products.filter(product => product.id !== id));
  };

  if (loading) return <div className="skeleton">Loading...</div>;
  if (error) return <div>Something went wrong.</div>;

  return (
    <div className="dashboard-container">
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>
              <button type="button" >
                ID
              </button>
            </th>
            <th>
              <button type="button" >
                Name
              </button>
            </th>
            <th>
              <button type="button" >
                Price
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.selling_price}</td>
              <td>
              <Button variant="contained" onClick={()=>handleRemove(product.id)} style={{margin:"15px"}}>Check</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
