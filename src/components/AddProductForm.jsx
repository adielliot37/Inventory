import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    vendorName: '',
    vendorNumber: '',
  });
  const [suggestions, setSuggestions] = useState({ names: [], vendors: [] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isExistingVendor, setIsExistingVendor] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;

  // Handle typing in vendor name manually
  if (name === 'vendorName') {
    setIsExistingVendor(false); // make number editable again
    setForm(prev => ({ ...prev, vendorName: value, vendorNumber: '' }));
  } else {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  setError('');
  setSuccess('');

  if (name === 'name' || name === 'vendorName') {
    fetchSuggestions(value);
  }
};


  const fetchSuggestions = async (term) => {
    if (!term) return;
    try {
      const res = await axios.get(`http://localhost:4000/suggestions/${term}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

const handleVendorSelect = async (vendor) => {
  setForm(prev => ({ ...prev, vendorName: vendor, vendorNumber: '' }));
  setSuggestions(prev => ({ ...prev, vendors: [] }));
  setIsExistingVendor(true);

  console.log('Selected vendor:', vendor);

  try {
    const res = await axios.get(`http://localhost:4000/search?q=${vendor}`);
    console.log('Fetched products for vendor:', res.data);

    const exactMatch = res.data.find(
      (p) => p.vendorName.toLowerCase() === vendor.toLowerCase()
    );

    console.log('Exact match:', exactMatch);

    if (exactMatch) {
      setForm(prev => ({
        ...prev,
        vendorNumber: exactMatch.vendorNumber,
      }));
      console.log('Set vendor number:', exactMatch.vendorNumber);
    } else {
      console.warn('No exact vendor match found, making number editable.');
      setForm(prev => ({ ...prev, vendorNumber: '' }));
      setIsExistingVendor(false);
    }
  } catch (err) {
    console.error('Error fetching vendor info:', err);
  }
};




  const validateForm = () => {
    const { name, price, vendorName, vendorNumber } = form;
    if (!name || !price || !vendorName || !vendorNumber) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:4000/add', form);
      setSuccess('Product added!');
      setForm({ name: '', price: '', vendorName: '', vendorNumber: '' });
      setSuggestions({ names: [], vendors: [] });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong.';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white dark:bg-[#1f1f1f] shadow rounded space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Product Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white"
          autoComplete="off"
        />
        {suggestions.names.length > 0 && (
          <div className="bg-white dark:bg-[#2a2a2a] border rounded mt-1">
            {suggestions.names.map((n, i) => (
              <div
                key={i}
                onClick={() => {
                  setForm(prev => ({ ...prev, name: n }));
                  setSuggestions(prev => ({ ...prev, names: [] }));
                }}
                className="px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
              >
                {n}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price *</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Vendor Name *</label>
        <input
          name="vendorName"
          value={form.vendorName}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white"
          autoComplete="off"
        />
        {suggestions.vendors.length > 0 && (
          <div className="bg-white dark:bg-[#2a2a2a] border rounded mt-1">
            {suggestions.vendors.map((v, i) => (
              <div
                key={i}
                onClick={() => handleVendorSelect(v)}
                className="px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
              >
                {v}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Vendor Number *</label>
        <input
        name="vendorNumber"
        value={form.vendorNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white"
        readOnly={isExistingVendor}
        />

      </div>

      <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
