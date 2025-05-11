import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';

const ModifyProductList = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const res = await axios.get('http://localhost:4000/products');
    setProducts(res.data);
  };

  const grouped = products.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = [];
    acc[item.name].push(item);
    return acc;
  }, {});

  const savePrice = async (id) => {
    await axios.put(`http://localhost:4000/update/${id}`, { price: newPrice });
    setEditId(null);
    setNewPrice('');
    fetchAll();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {Object.keys(grouped).map((name) => (
        <div key={name} className="bg-white dark:bg-[#1f1f1f] p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{name}</h2>
          <div className="space-y-2">
            {grouped[name].map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2">
                <div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.vendorName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.vendorNumber}</div>
                </div>

                {editId === item._id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="p-1 rounded bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white border"
                    />
                    <CheckIcon
                      onClick={() => savePrice(item._id)}
                      className="h-5 w-5 text-green-500 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="flex gap-2 items-center text-gray-800 dark:text-white">
                    ₹{item.price}
                    <PencilSquareIcon
                      onClick={() => {
                        setEditId(item._id);
                        setNewPrice(item.price);
                      }}
                      className="h-5 w-5 cursor-pointer hover:text-blue-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModifyProductList;
