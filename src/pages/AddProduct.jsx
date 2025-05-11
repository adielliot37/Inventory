import React from 'react';
import AddProductForm from '../components/AddProductForm';

const AddProduct = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Add Product</h1>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
