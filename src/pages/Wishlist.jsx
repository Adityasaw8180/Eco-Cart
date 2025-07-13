import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // if you use routing
import Header from '../components/Header'; // Update this path based on your file structure

const Wishlist = () => {
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
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
    setTotalEcoScore(calculateTotalScore(storedWishlist));
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setTotalEcoScore(calculateTotalScore(updatedWishlist));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            
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
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <Link to="/home" className="text-blue-500 hover:underline mt-2 inline-block">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain mr-4"
                    />
                    <div className="flex-1">
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
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
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

export default Wishlist;
