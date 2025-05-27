
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Croissant, Coffee, Egg } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-cream-light px-2 py-6">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Dawn Brew Bistro was founded with a passion for creating the perfect morning 
            experience, combining artisanal coffee with freshly prepared breakfast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md border-none overflow-hidden bg-white hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-4">
                <Coffee className="h-8 w-8 text-coffee" />
              </div>
              <h3 className="text-xl font-bold mb-2">Artisanal Coffee</h3>
              <p className="text-muted-foreground">
                We source sustainably grown beans and roast them in small batches to ensure the perfect flavor profile.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none overflow-hidden bg-white hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-4">
                <Egg className="h-8 w-8 text-coffee" />
              </div>
              <h3 className="text-xl font-bold mb-2">Farm-Fresh Ingredients</h3>
              <p className="text-muted-foreground">
                Our breakfast menu features locally sourced ingredients, prepared fresh each morning for the best taste.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none overflow-hidden bg-white hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-4">
                <Croissant className="h-8 w-8 text-coffee" />
              </div>
              <h3 className="text-xl font-bold mb-2">Homemade Pastries</h3>
              <p className="text-muted-foreground">
                Our in-house bakery creates fresh pastries daily, using traditional recipes and modern techniques.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
