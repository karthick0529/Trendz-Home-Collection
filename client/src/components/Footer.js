import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        {/* Column 1: About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-gray-400">
            We offer the best e-commerce experience with high-quality products
            and fast delivery. Shop with us for the latest trends and deals!
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/shop" className="text-gray-400 hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">Email: info@ecommerce.com</li>
            <li className="text-gray-400">Phone: +1 234 567 890</li>
            <li className="text-gray-400">Address: 123 Market St, City</li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto flex justify-center space-x-6">
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p className="text-center text-gray-400 mt-4">
          © {new Date().getFullYear()} E-Commerce, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;