import React from 'react';
import ModifyProductList from '../components/ModifyProductList';

const ModifyProducts = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkbg p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Modify Products</h1>
      <ModifyProductList />
    </div>
  );
};

export default ModifyProducts;
