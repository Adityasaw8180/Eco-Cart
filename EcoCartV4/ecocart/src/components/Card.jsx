import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Zap, ArrowRight } from 'lucide-react';

const Card = ({ product, ecoScore, carbonFootprint, allProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [comparedProduct, setComparedProduct] = useState(null);
  const navigate = useNavigate();

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
    if (score >= 7) return 'text-primary';
    if (score >= 4) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <>
      <div className="group relative bg-dark/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <h2 className="text-xl font-orbitron font-bold mt-4 text-light group-hover:text-primary transition-colors duration-300">
            {product.title}
          </h2>
          <p className="text-light/70 mt-2 font-futura">{product.description}</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className={`w-5 h-5 ${getEcoColor(ecoScore)}`} />
              <div className="flex-1">
                <div className="flex justify-between text-sm font-futura">
                  <span className="text-light/70">Eco Score</span>
                  <span className={getEcoColor(ecoScore)}>{ecoScore}/10</span>
                </div>
                <div className="h-1.5 bg-dark/50 rounded-full overflow-hidden mt-1">
                  <div 
                    className={`h-full ${ecoScore >= 7 ? 'bg-primary' : ecoScore >= 4 ? 'bg-yellow-400' : 'bg-red-500'} transition-all duration-500`}
                    style={{ width: `${ecoScore * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Zap className={`w-5 h-5 ${carbonFootprint <= 500 ? 'text-primary' : carbonFootprint <= 1000 ? 'text-yellow-400' : 'text-red-500'}`} />
              <div className="flex-1">
                <div className="flex justify-between text-sm font-futura">
                  <span className="text-light/70">Carbon Footprint</span>
                  <span className={carbonFootprint <= 500 ? 'text-primary' : carbonFootprint <= 1000 ? 'text-yellow-400' : 'text-red-500'}>
                    {carbonFootprint}g CO₂
                  </span>
                </div>
                <div className="h-1.5 bg-dark/50 rounded-full overflow-hidden mt-1">
                  <div 
                    className={`h-full ${carbonFootprint <= 500 ? 'bg-primary' : carbonFootprint <= 1000 ? 'bg-yellow-400' : 'bg-red-500'} transition-all duration-500`}
                    style={{ width: `${Math.min(100, (carbonFootprint / 2000) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleViewDetails}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 px-4 rounded-lg font-futura transition-all duration-300 group-hover:shadow-glow"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {showModal && comparedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-dark/80 border border-primary/20 rounded-xl p-8 max-w-4xl w-full mx-4 shadow-glow-lg">
            <h4 className="text-2xl font-orbitron text-center text-primary mb-6">Eco Comparison</h4>
            <h3 className='text-xl font-futura text-center text-light/90 mb-8'>Choose the more sustainable option for our planet</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                </div>
                <h4 className="font-orbitron text-lg text-light">{product.title}</h4>
                <p className="text-light/70 font-futura text-sm mt-1">{product.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span className="text-light/70 font-futura">Eco Score: </span>
                    <span className={getEcoColor(ecoScore)}>{ecoScore}/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-light/70 font-futura">Carbon: </span>
                    <span className={carbonFootprint <= 500 ? 'text-primary' : carbonFootprint <= 1000 ? 'text-yellow-400' : 'text-red-500'}>
                      {carbonFootprint}g CO₂
                    </span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                  <img src={comparedProduct.image} alt={comparedProduct.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                </div>
                <h4 className="font-orbitron text-lg text-light">{comparedProduct.title}</h4>
                <p className="text-light/70 font-futura text-sm mt-1">{comparedProduct.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span className="text-light/70 font-futura">Eco Score: </span>
                    <span className={getEcoColor(getEco(comparedProduct.material).ecoScore)}>
                      {getEco(comparedProduct.material).ecoScore}/10
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-light/70 font-futura">Carbon: </span>
                    <span className={getEco(comparedProduct.material).carbonFootprint <= 500 ? 'text-primary' : getEco(comparedProduct.material).carbonFootprint <= 1000 ? 'text-yellow-400' : 'text-red-500'}>
                      {getEco(comparedProduct.material).carbonFootprint}g CO₂
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-lg bg-dark/50 text-light/70 hover:text-light hover:bg-dark/80 transition-colors duration-300 font-futura"
              >
                Cancel
              </button>
              <button
                onClick={handleClickChosen}
                className="px-6 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors duration-300 font-futura flex items-center gap-2"
              >
                Choose This
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const getEco = (material) => {
  switch (material.toLowerCase()) {
    case "steel": return { ecoScore: 9, carbonFootprint: 0.5 };
    case "plastic": return { ecoScore: 2, carbonFootprint: 1000 };
    case "paper": return { ecoScore: 6, carbonFootprint: 400 };
    default: return { ecoScore: 5, carbonFootprint: 500 };
  }
};

export default Card;
