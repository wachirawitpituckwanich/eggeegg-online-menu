
import React from 'react';
import { Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-yellow-800 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="h-6 w-6" />
              <span className="font-playfair text-xl font-bold">Egg-e-egg</span>
            </div>
            <p className="text-cream/80 max-w-xs">
              A cozy spot to enjoy artisanal coffee and delicious breakfast in a warm, welcoming atmosphere.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white hover:text-cream transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">ลิ้งค์</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-cream/80 hover:text-white transition-colors">หน้าหลัก</a>
              <a href="#about" className="text-cream/80 hover:text-white transition-colors">เกี่ยวกับ</a>
              <a href="#menu" className="text-cream/80 hover:text-white transition-colors">เมนู</a>
              <a href="#location" className="text-cream/80 hover:text-white transition-colors">ติดต่อเรา</a>
            </nav>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-cream/60 text-sm">
          <p>© {new Date().getFullYear()} Dawn Brew Bistro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
