import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // if you use routing
import Header from '../components/Header'; // Update this path based on your file structure

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [ecoScoreTotal, setEcoScoreTotal] = useState(0);

  // Function to determine if product is sustainable
  const isSustainable = (product) => {
    const keywords = ['plastic', 'non-eco', 'synthetic'];
    const title = product.title.toLowerCase();
    return !keywords.some(word => title.includes(word)) &&
      (product.ecoScore >= 7 || product.carbonFootprint <= 500);
  };

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);

    const totalScore = storedWishlist.reduce((acc, product) => {
      return acc + (isSustainable(product) ? 20 : -10);
    }, 0);

    setEcoScoreTotal(Math.max(0, totalScore));
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    const totalScore = updatedWishlist.reduce((acc, product) => {
      return acc + (isSustainable(product) ? 20 : -10);
    }, 0);
    setEcoScoreTotal(Math.max(0, totalScore));
  };

  return (
    <>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 mt-8">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {wishlist.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg shadow-md relative">
                  <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm mt-1">Eco Score: {product.ecoScore}</p>
                  <p className="text-sm">Carbon: {product.carbonFootprint} gCO2</p>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-lg font-medium">
              Total Eco Score: <span className="font-bold">{ecoScoreTotal}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
