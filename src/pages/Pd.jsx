// src/pages/ProductDetails.jsx
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Pd = () => {
  const { state } = useLocation();
  const { product, isEcoFriendly } = state || {};
  const navigate=useNavigate()

  const handleCartClick = (product) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
    if (!wishlist.some(item => item.id === product.id)) {
      wishlist.push({
        ...product,
        ecoScore: product.ecoScore ?? 50
      });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
  
      // ✅ Navigate instead of opening new tab
      navigate('/wishlist');
    } else {
      alert('This item is already in your wishlist!');
    }
  };
  

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Header />
      <div className="p-6 max-w-2xl mx-auto mt-3">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <img src={product.image} alt={product.title} className="w-full h-64 object-contain rounded-lg mb-4" />
        <p className="text-gray-700 mb-2">{product.description}</p>

        {isEcoFriendly ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-md">
            <h2 className="text-xl font-bold">🌿 Great Choice!</h2>
            <p>This product is sustainable and contributes positively to the environment.</p>
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 p-4 rounded-md">
            <h2 className="text-xl font-bold">⚠️ Let's Rethink</h2>
            <p>This product has a higher carbon footprint. Consider switching to an eco-friendly option for a better planet.</p>
          </div>
        )}

        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            onClick={() => handleCartClick(product)}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </>
  );
};

export default Pd;
