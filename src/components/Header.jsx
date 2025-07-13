import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Search, X } from 'lucide-react'
import CameraCapture from './CameraCapture'
import { useProductSearch } from '../hooks/useFirestore'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [openCamera, setOpenCamera] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const { results: searchResults, loading: searchLoading } = useProductSearch(searchQuery);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlingClickLog = () => {
    if (currentUser) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  const handlingClickHelp = () => {
    navigate("/help");
  };

  const handlingClickHome = () => {
    navigate("/home");
  };

  const handleCameraIconClick = () => {
    setOpenCamera(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/product/${searchResults[0].id}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <>
      <div className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-4 bg-green-600 text-white">
        <div className="text-2xl font-bold">EcoCart</div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 relative" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchFocused(false);
                }}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Search Results Dropdown */}
          {isSearchFocused && (searchQuery || searchResults.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {searchLoading ? (
                <div className="p-3 text-center text-gray-500">Searching...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-3 text-center text-gray-500">No results found</div>
              ) : (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                    onClick={() => handleResultClick(product.id)}
                  >
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-contain mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-black">{product.title}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="flex gap-6 text-lg items-center">
          <div className="cursor-pointer hover:underline" onClick={handlingClickHome}>Home</div>
          <div className="cursor-pointer hover:underline" onClick={handlingClickHelp}>Help</div>
          <div className="cursor-pointer hover:underline" onClick={handlingClickLog}>
            {currentUser ? 'Account' : 'Login'}
          </div>
          <div className="cursor-pointer hover:underline" onClick={() => navigate("/wishlist")}>Cart</div>
          <div className="cursor-pointer" onClick={handleCameraIconClick}>
            <Camera size={24} />
          </div>
        </div>
      </div>

      {openCamera && <CameraCapture onCapture={() => setOpenCamera(false)} />}
    </>
  );
};

export default Header;
