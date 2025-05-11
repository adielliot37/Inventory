import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import BrowseProducts from './pages/BrowseProducts';
import ThemeToggle from './components/ThemeToggle';
import ModifyProducts from './pages/ModifyProducts';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <nav className="bg-white dark:bg-[#1f1f1f] dark:bg-gray-800 p-4 shadow flex justify-between items-center">
          <div className="space-x-4">
            <a href="/" className="bg-gray-800 hover:bg-gray-700 text-white
 dark:text-blue-400 font-semibold">Add Product</a>
            <a href="/browse" className="bg-gray-800 hover:bg-gray-700 text-white
 dark:text-blue-400 font-semibold">Browse Products</a>
  <a href="/modify" className="bg-gray-800 hover:bg-gray-700 text-white
 dark:text-blue-400 font-semibold">Modify</a>
          </div>
          <ThemeToggle />
        </nav>

        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/browse" element={<BrowseProducts />} />
               <Route path="/modify" element={<ModifyProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
