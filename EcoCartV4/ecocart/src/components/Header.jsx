import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Home, HelpCircle, User, ShoppingCart } from 'lucide-react'
import CameraCapture from './CameraCapture'

const Header = () => {
  const navigate = useNavigate();
  const [openCamera, setOpenCamera] = useState(false);

  const handlingClickLog = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  const handlingClickHelp = () => {
    navigate("/help");
  };

  const handlingClickHome = () => {
    navigate("/home");
  };

  const handleCameraIconClick = () => {
    setOpenCamera(true);
  };

  return (
    <>
      <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-dark/80 border-b border-primary/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-3xl font-orbitron font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient cursor-pointer"
              onClick={handlingClickHome}
            >
              EcoCart
            </div>
            <div className="flex gap-8 items-center">
              <button 
                onClick={handlingClickHome}
                className="flex items-center gap-2 text-light hover:text-primary transition-colors duration-300 group"
              >
                <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-futura">Home</span>
              </button>
              <button 
                onClick={handlingClickHelp}
                className="flex items-center gap-2 text-light hover:text-secondary transition-colors duration-300 group"
              >
                <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-futura">Help</span>
              </button>
              <button 
                onClick={handlingClickLog}
                className="flex items-center gap-2 text-light hover:text-accent transition-colors duration-300 group"
              >
                <User className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-futura">Account</span>
              </button>
              <button 
                onClick={() => navigate("/wishlist")}
                className="flex items-center gap-2 text-light hover:text-primary transition-colors duration-300 group"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-futura">Cart</span>
              </button>
              <button 
                onClick={handleCameraIconClick}
                className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors duration-300 group"
              >
                <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {openCamera && <CameraCapture onClose={() => setOpenCamera(false)} />}
    </>
  );
};

export default Header;
