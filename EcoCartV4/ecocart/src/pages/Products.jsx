// src/pages/Products.jsx
import React from 'react';
import Card from '../components/Card';


const products = [
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 pt-12">
      {products.map((product) => {
        const { ecoScore, carbonFootprint } = getSustainabilityStats(product.material);
        return (
          <Card 
            key={product.id} 
            product={product} 
            ecoScore={getSustainabilityStats(product.material).ecoScore} 
            carbonFootprint={getSustainabilityStats(product.material).carbonFootprint} 
            allProducts={products}
          />
        );
      })}
    </div>
  );
};

export default Products;
