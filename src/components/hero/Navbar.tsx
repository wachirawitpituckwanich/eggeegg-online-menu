import React, { useState } from "react";
import { Coffee } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm px-4 md:px-8">
      <div className="container-custom flex justify-between items-center">
        <Link href="#" className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-coffee-dark" />
          <span className="font-playfair text-xl font-bold">Egg-e-egg</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => {
              var elem = document.getElementById("about");
              if (elem) {
                elem.scrollIntoView();
              }
            }}
            className="text-coffee-dark hover:text-coffee transition-colors"
          >
            เกี่ยวกับ
          </button>
          <button
            onClick={() => {
              var elem = document.getElementById("menu");
              if (elem) {
                elem.scrollIntoView();
              }
            }}
            className="text-coffee-dark hover:text-red transition-colors"
          >
            เมนู
          </button>
          <button
            onClick={() => {
              var elem = document.getElementById("location");
              if (elem) {
                elem.scrollIntoView();
              }
            }}
            className="text-coffee-dark hover:text-coffee transition-colors"
          >
            ติดต่อเรา
          </button>
        </div>

        <button
          className="md:hidden text-coffee-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-cream-light py-4 px-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <a
              href="#about"
              className="text-coffee-dark hover:text-coffee transition-colors py-2"
            >
              เกี่ยวกับ
            </a>
            <a
              href="#menu"
              className="text-coffee-dark hover:text-coffee transition-colors py-2"
            >
              เมนู
            </a>
            <a
              href="#location"
              className="text-coffee-dark hover:text-coffee transition-colors py-2"
            >
              ติดต่อเรา
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
