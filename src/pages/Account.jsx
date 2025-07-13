import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [totalEcoScore, setTotalEcoScore] = useState(0);

  // Function to determine if product is sustainable
  const isSustainable = (product) => {
    const keywords = ['plastic', 'non-eco', 'synthetic'];
    const title = product.title.toLowerCase();
    return !keywords.some(word => title.includes(word)) &&
      (product.ecoScore >= 7 || product.carbonFootprint <= 500);
  };

  // Calculate score for a single product
  const calculateProductScore = (product) => {
    return isSustainable(product) ? 20 : -10;
  };

  // Calculate total score for all products
  const calculateTotalScore = (items) => {
    return Math.max(0, items.reduce((acc, item) => {
      return acc + calculateProductScore(item);
    }, 0));
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Get wishlist items from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
    setTotalEcoScore(calculateTotalScore(storedWishlist));
  }, [currentUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('wishlist');
    navigate('/');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* User Profile Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <p className="mt-1 text-lg">{currentUser.username || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-lg">{currentUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <p className="mt-1 text-lg">{currentUser.mobileNumber || 'Not set'}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Wishlist Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            
            {/* Total EcoScore Display */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Total Eco Score</h3>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full" 
                    style={{ width: `${Math.min((totalEcoScore / (wishlist.length * 20)) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="ml-4 text-green-800 font-bold">{totalEcoScore}</span>
              </div>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-contain mb-2"
                    />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Eco Score:</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${isSustainable(item) ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.abs(calculateProductScore(item)) * 5}%` }}
                          ></div>
                        </div>
                        <span className={`ml-2 text-sm font-medium ${isSustainable(item) ? 'text-green-600' : 'text-red-600'}`}>
                          {calculateProductScore(item)} points
                        </span>
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        {isSustainable(item) ? 'Eco-friendly product' : 'Non-eco-friendly product'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account; 