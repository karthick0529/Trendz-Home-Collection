import React, { useState, useContext } from 'react';
import logo from '../logo/trendy.jpg';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from '../context/AppContext';
import { useSelector } from 'react-redux';

export const Navbar = ({ onSearch }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const { cart } = useSelector((state) => state);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for search filters
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');

  function logoutHandler() {
    setIsLoggedIn(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Pass the search filters back to the parent component to filter the products
    onSearch({ price, size, brand });
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-900 to-black shadow-lg sticky top-0 z-50">
      {/* Logo Section */}
      <NavLink to="/">
        <img 
          src={logo} 
          alt="business-logo" 
          width={200} 
          height={100} 
          className="rounded-md transform transition duration-500 hover:scale-110 hover:rotate-6" 
        />
      </NavLink>

      {/* Search Section */}
      <div className="hidden md:flex items-center mx-10">
        <form onSubmit={handleSearch} className="flex space-x-4">
          {/* Price Filter */}
          <input 
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />

          {/* Size Filter */}
          <select 
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          >
            <option value="">Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          {/* Brand Filter */}
          <input 
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
          />

          {/* Submit Button */}
          <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
            Search
          </button>
        </form>
      </div>

      {/* Links Section for Desktop */}
      <div className="hidden md:flex items-center space-x-6 text-gray-300 font-semibold">
        <NavLink to="/" className="hover:text-gold-400 transition duration-300">
          Home
        </NavLink>
        <NavLink to="/cart" className="hover:text-gold-400 transition duration-300">
          <div className="relative">
            <FaShoppingCart className="text-2xl hover:text-green-800" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                {cart.length}
              </span>
            )}
          </div>
        </NavLink>
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className="hover:text-gold-400 transition duration-300">
              LogIn
            </NavLink>
            <NavLink to="/signup" className="hover:text-gold-400 transition duration-300">
              SignUp
            </NavLink>
          </>
        ) : (
          <button 
            onClick={logoutHandler} 
            className="bg-gold-600 text-gray-300 px-4 py-2 rounded-md hover:bg-gold-700 transition duration-300"
          >
            SignOut
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden text-gray-300">
        <button onClick={toggleMobileMenu} className="text-3xl focus:outline-none">
          &#9776; {/* Menu icon */}
        </button>
      </div>

      {/* Mobile Menu (shown when toggled) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-gray-300 py-4 z-50 flex flex-col space-y-4">
          <NavLink to="/" className="hover:text-gold-400 transition duration-300" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/cart" className="hover:text-gold-400 transition duration-300" onClick={() => setIsMobileMenuOpen(false)}>
            Cart
          </NavLink>
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="hover:text-gold-400 transition duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                LogIn
              </NavLink>
              <NavLink to="/signup" className="hover:text-gold-400 transition duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                SignUp
              </NavLink>
            </>
          ) : (
            <button 
              onClick={() => { logoutHandler(); setIsMobileMenuOpen(false); }} 
              className="hover:text-gold-400 transition duration-300"
            >
              SignOut
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
