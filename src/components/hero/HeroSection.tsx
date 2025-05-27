
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative bg-coffee-light min-h-[85vh] flex items-center overflow-hidden px-2">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-white md:px-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Start Your Day with Perfect Breakfast</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Handcrafted coffee and freshly-made breakfast in a cozy atmosphere.
            Join us for a morning experience that awakens your senses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="btn-primary">View Our Menu</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
