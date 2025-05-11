import React, { useState } from 'react';
import axios from 'axios';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
   
  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length >= 2) {
      const res = await axios.get(`http://localhost:4000/search?q=${q}`);
      setResults(res.data);
    } else {
      setResults([]);
    }
  };

  const groupedByName = results.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = [];
    acc[item.name].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto p-4">
      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search product..."
        className="w-full p-2 border rounded mb-4 bg-white dark:bg-[#2a2a2a] text-black dark:text-white"

      />

      {Object.keys(groupedByName).map((name) => (
        <div key={name} className="mb-6 bg-white dark:bg-[#1f1f1f] dark:bg-gray-800 rounded shadow p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{name}</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600 dark:text-gray-300">
                <th>Vendor</th>
                <th>Vendor Number</th>
                <th>Price</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {groupedByName[name].map((p, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                  <td className="py-1">{p.vendorName}</td>
                  <td className="py-1">{p.vendorNumber}</td>
                  <td className="py-1">₹{p.price}</td>
                  <td className="py-1">{new Date(p.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProductSearch;
