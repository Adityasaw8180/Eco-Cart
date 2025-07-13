import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Card = ({ product, ecoScore, carbonFootprint, allProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [comparedProduct, setComparedProduct] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Get existing wishlist from localStorage
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product is already in wishlist
    const isAlreadyInWishlist = existingWishlist.some(item => item.id === product.id);
    
    if (!isAlreadyInWishlist) {
      // Add product to wishlist with eco score and carbon footprint
      const productWithEcoData = {
        ...product,
        ecoScore: getEco(product.material).ecoScore,
        carbonFootprint: getEco(product.material).carbonFootprint
      };
      
      const updatedWishlist = [...existingWishlist, productWithEcoData];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert('Product added to wishlist!');
    } else {
      alert('Product is already in your wishlist!');
    }
  };

  const handleViewDetails = () => {
    const pair = getComparisonProduct(product, allProducts);
    setComparedProduct(pair);
    setShowModal(true);
  };

  const handleClickChosen = () => {
    const isEcoFriendly = ecoScore >= 7 || carbonFootprint <= 500;
    navigate('/pd', {
      state: {
        product,
        isEcoFriendly,
      },
    });
    setShowModal(false);
  };

  // Comparison logic
  const getComparisonProduct = (mainProduct, products) => {
    const pairs = {
      "Plastic Bottle": "Steel Bottle",
      "Steel Bottle": "Plastic Bottle",
      "Plastic bags": "Paper Bags",
      "Paper Bags": "Plastic bags",
    };

    const matchTitle = pairs[mainProduct.title];
    return products.find((p) => p.title === matchTitle);
  };

  const getEcoColor = (score) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <div className={`${getEcoColor(ecoScore)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
              Eco Score: {ecoScore}/10
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          {/* Price and Carbon Footprint */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {carbonFootprint}kg CO₂
            </div>
          </div>

          {/* Material Badge */}
          <div className="flex items-center mb-4">
            <span className="text-sm font-medium text-gray-500">Material:</span>
            <span className="ml-2 px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              {product.material.charAt(0).toUpperCase() + product.material.slice(1)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewDetails}
              className="flex-1 border border-green-500 text-green-500 py-2 px-4 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && comparedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 space-y-4">
            <h4 className="text-xl font-semibold text-center">Comparison</h4>
            <h3 className='text-2xl font-bold text-green-400'>Choose which benefits the Mother Earth</h3>
            <div className="flex justify-between space-x-4">
              {/* Selected Product */}
              <div className="w-1/2 text-center">
                <img src={product.image} alt={product.title} className="w-32 h-32 mx-auto object-contain" />
                <h4 className="font-bold mt-2">{product.title}</h4>
                <p className="text-sm">{product.description}</p>
                <p><strong>Eco Score:</strong> {ecoScore}</p>
                <p><strong>Carbon:</strong> {carbonFootprint} gCO2</p>
              </div>

              {/* Compared Product */}
              <div className="w-1/2 text-center">
                <img src={comparedProduct.image} alt={comparedProduct.title} className="w-32 h-32 mx-auto object-contain" />
                <h4 className="font-bold mt-2">{comparedProduct.title}</h4>
                <p className="text-sm">{comparedProduct.description}</p>
                <p><strong>Eco Score:</strong> {getEco(comparedProduct.material).ecoScore}</p>
                <p><strong>Carbon:</strong> {getEco(comparedProduct.material).carbonFootprint} gCO2</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Got it
              </button>
              <button
                onClick={handleClickChosen}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Keep Chosen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper to get eco stats from material
const getEco = (material) => {
  switch (material.toLowerCase()) {
    case "steel": return { ecoScore: 9, carbonFootprint: 0.5 };
    case "plastic": return { ecoScore: 2, carbonFootprint: 1000 };
    case "paper": return { ecoScore: 6, carbonFootprint: 400 };
    default: return { ecoScore: 5, carbonFootprint: 500 };
  }
};

export default Card;
