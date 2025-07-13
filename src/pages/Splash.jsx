import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash({ onComplete }) {
  const navigate=useNavigate()
  const text = 'EcoCart';
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, idx + 1));
      idx++;
      if (idx === text.length) {
        clearInterval(interval);
        // give a tiny pause then call onComplete
        setTimeout(()=>{
          navigate('/home')
        }, 800);
      }
    }, 150); // you can tweak speed here

    return () => clearInterval(2000);
  }, [navigate]);

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-gradient-to-br from-[#B2FFDA] via-[#6EE7B7] to-[#22C55E] overflow-hidden">
      <h1 className="text-5xl font-pacifico ">{displayed}</h1>
    </div>
  );
}
