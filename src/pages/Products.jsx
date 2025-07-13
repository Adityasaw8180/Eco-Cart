// src/pages/Products.jsx
import React, { useState } from 'react';
import Card from '../components/Card';
import { motion } from 'framer-motion';

export const products = [
  {
    id: 1,
    title: "Steel Bottle",
    description: "Eco-friendly stainless steel bottle.",
    price: 150,
    image: "https://nanonine.in/cdn/shop/products/Slimsteelblue1_af4121c1-87f8-4918-a0c9-48369d5a0cde.jpg?v=1665492501",
    material: "steel",
  },
  {
    id: 2,
    title: "Plastic Bottle",
    description: "Single-use plastic bottle.",
    price: 50,
    image: "https://cdn.recyclopedia.sg/strapi-assets/Clear_plastic_bottle_2dc92dc39c.png",
    material: "plastic",
  },
  {
    id: 3,
    title: "Plastic bags",
    price: 10,
    description: "Single-use plastic bags",
    image: "https://www.environmentbuddy.com/wp-content/uploads/2020/01/Manufacturing-of-plastic-bags.jpg",
    material: "plastic",
    
  },
  {
    id: 4,
    title: "Paper Bags",
    price: 20,
    description: "Reusable paper bags", 
    image: "https://apisap.fabindia.com/medias/20175849-01.jpg?context=bWFzdGVyfGltYWdlc3wyMTQ5NzB8aW1hZ2UvanBlZ3xhR05qTDJnNU1pODBPREkxTWpreE56UTBPRGN6TkM4eU1ERTNOVGcwT1Y4d01TNXFjR2N8MGM4YzFkMWYxNjJjZmZlOWRmOWE0OGYwNjQyYmI2N2FjZGM4YWI3MWZmMTE5Yjk5NTNhZDY2ODI4YzhmNWM3ZQ", 
    material: "paper",
  }
];

const getSustainabilityStats = (material) => {
  switch (material.toLowerCase()) {
    case "steel":
      return { ecoScore: 9, carbonFootprint: 0.5 };
    case "plastic":
      return { ecoScore: 2, carbonFootprint: 1000 };
    case "paper":
      return { ecoScore: 6, carbonFootprint: 400 };
    default:
      return { ecoScore: 5, carbonFootprint: 500 };
  }
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'steel', name: 'Steel Products' },
    { id: 'plastic', name: 'Plastic Products' },
    { id: 'paper', name: 'Paper Products' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.material === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-64 bg-green-100 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-green-800"
          >
            Sustainable Living
          </motion.h1>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category.id 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'}`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => {
            const { ecoScore, carbonFootprint } = getSustainabilityStats(product.material);
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  product={product} 
                  ecoScore={ecoScore}
                  carbonFootprint={carbonFootprint}
                  allProducts={products}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Eco Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-4">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">4+</div>
              <div className="text-gray-600">Sustainable Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">100%</div>
              <div className="text-gray-600">Eco-Friendly Materials</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">9/10</div>
              <div className="text-gray-600">Average Eco Score</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;

