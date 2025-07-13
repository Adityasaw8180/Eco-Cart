import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Products from './Products';

const Home = () => {
  const [products, setProducts] = useState([]);

  

  return (
    <>
      <Header />
      <Products />
      
    </>
  );
};

export default Home;
