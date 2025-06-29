// components/Header.tsx
import React from 'react';
import Coin from "../assets/khcil.png";
import GoldRateDropDown from './GoldRateDropdown';

const Header: React.FC = () => {

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={Coin} 
              alt="JESK Jewellery" 
              className="h-10 w-auto" 
            />
            {/* <span className="text-xl font-bold text-gold-500">JESK Jewellery</span> */}
          </div>

          {/* Right side - City and Price */}
          <div>
           <GoldRateDropDown/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;