
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Egg, Croissant, CupSoda } from "lucide-react";

// Menu Item component
const MenuItem = ({ 
  name, 
  description, 
  price 
}: { 
  name: string; 
  description: string; 
  price: string;
}) => {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold">{name}</h4>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          </div>
          <span className="text-coffee-dark font-semibold">{price}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState("coffee");
  
  return (
    <section id="menu" className="bg-white px-2 py-6">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our seasonal menu crafted with care to provide the perfect breakfast experience.
          </p>
        </div>
        
        <Tabs defaultValue="coffee" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-cream">
              <TabsTrigger value="coffee" className="flex gap-2 items-center">
                <Coffee className={`h-4 w-4 ${activeTab === "coffee" ? "text-coffee-dark" : ""}`} />
                <span>Coffee</span>
              </TabsTrigger>
              <TabsTrigger value="breakfast" className="flex gap-2 items-center">
                <Egg className={`h-4 w-4 ${activeTab === "breakfast" ? "text-coffee-dark" : ""}`} />
                <span>Breakfast</span>
              </TabsTrigger>
              <TabsTrigger value="pastries" className="flex gap-2 items-center">
                <Croissant className={`h-4 w-4 ${activeTab === "pastries" ? "text-coffee-dark" : ""}`} />
                <span>Pastries</span>
              </TabsTrigger>
              <TabsTrigger value="drinks" className="flex gap-2 items-center">
                <CupSoda className={`h-4 w-4 ${activeTab === "drinks" ? "text-coffee-dark" : ""}`} />
                <span>Drinks</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="coffee" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MenuItem 
                name="Signature Espresso" 
                description="Our house blend with notes of chocolate and caramel" 
                price="$3.50"
              />
              <MenuItem 
                name="Pour Over" 
                description="Handcrafted, single-origin coffee prepared with care" 
                price="$4.25"
              />
              <MenuItem 
                name="Cappuccino" 
                description="Equal parts espresso, steamed milk, and silky foam" 
                price="$4.75"
              />
              <MenuItem 
                name="Latte" 
                description="Smooth espresso with steamed milk and light foam" 
                price="$4.50"
              />
              <MenuItem 
                name="Mocha" 
                description="Espresso with chocolate, steamed milk, and whipped cream" 
                price="$5.25"
              />
              <MenuItem 
                name="Cold Brew" 
                description="Slow-steeped for 24 hours for a smooth, rich flavor" 
                price="$4.75"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="breakfast" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MenuItem 
                name="Avocado Toast" 
                description="Sourdough bread with smashed avocado, poached egg, and microgreens" 
                price="$12.50"
              />
              <MenuItem 
                name="Breakfast Burrito" 
                description="Scrambled eggs, black beans, avocado, salsa, and cheese" 
                price="$10.75"
              />
              <MenuItem 
                name="Eggs Benedict" 
                description="English muffin, poached eggs, ham, and hollandaise sauce" 
                price="$13.25"
              />
              <MenuItem 
                name="Pancake Stack" 
                description="Fluffy buttermilk pancakes with maple syrup and fresh berries" 
                price="$11.50"
              />
              <MenuItem 
                name="Granola Bowl" 
                description="House-made granola with Greek yogurt, honey, and seasonal fruit" 
                price="$9.25"
              />
              <MenuItem 
                name="Farmer's Omelet" 
                description="Three-egg omelet with seasonal vegetables and goat cheese" 
                price="$12.75"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="pastries" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MenuItem 
                name="Butter Croissant" 
                description="Flaky, buttery layers with a golden-brown exterior" 
                price="$3.75"
              />
              <MenuItem 
                name="Blueberry Muffin" 
                description="Moist muffin loaded with fresh blueberries" 
                price="$3.50"
              />
              <MenuItem 
                name="Cinnamon Roll" 
                description="Soft roll with cinnamon sugar swirl and cream cheese frosting" 
                price="$4.25"
              />
              <MenuItem 
                name="Almond Croissant" 
                description="Buttery croissant filled with almond cream and topped with sliced almonds" 
                price="$4.50"
              />
              <MenuItem 
                name="Chocolate Scone" 
                description="Rich chocolate scone with chocolate chips throughout" 
                price="$3.75"
              />
              <MenuItem 
                name="Morning Bun" 
                description="Croissant dough rolled with cinnamon sugar and orange zest" 
                price="$4.00"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="drinks" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MenuItem 
                name="Fresh Orange Juice" 
                description="Freshly squeezed each morning" 
                price="$4.50"
              />
              <MenuItem 
                name="Green Smoothie" 
                description="Spinach, banana, apple, and ginger" 
                price="$5.75"
              />
              <MenuItem 
                name="Berry Blast Smoothie" 
                description="Mixed berries, yogurt, and honey" 
                price="$5.75"
              />
              <MenuItem 
                name="Iced Tea" 
                description="House-brewed black tea over ice" 
                price="$3.25"
              />
              <MenuItem 
                name="Chai Latte" 
                description="Spiced tea concentrate with steamed milk" 
                price="$4.50"
              />
              <MenuItem 
                name="Hot Chocolate" 
                description="Rich chocolate with steamed milk and whipped cream" 
                price="$4.25"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MenuSection;
