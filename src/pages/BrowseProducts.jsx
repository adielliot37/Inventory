import React from 'react';
import ProductSearch from '../components/ProductSearch';

const BrowseProducts = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Search Products</h1>
      <ProductSearch />
    </div>
  );
};

export default BrowseProducts;
