
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  name: string;
  role?: string;
  avatarSrc?: string;
}

const Testimonial = ({ quote, name, role, avatarSrc }: TestimonialProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="shadow-md border-none bg-white h-full flex flex-col">
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400">★</span>
          ))}
        </div>
        
        <blockquote className="text-muted-foreground italic mb-6 flex-grow">
          "{quote}"
        </blockquote>
        
        <div className="flex items-center mt-auto">
          <Avatar className="h-10 w-10 mr-3">
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={name} />
            ) : null}
            <AvatarFallback className="bg-coffee-light text-coffee-dark">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="font-semibold">{name}</div>
            {role && <div className="text-sm text-muted-foreground">{role}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-cream">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial
            quote="The best coffee in town, hands down! I love coming here for their signature espresso and avocado toast. The atmosphere is so inviting, and the staff is always friendly."
            name="Emily Johnson"
            role="Local Resident"
          />
          
          <Testimonial
            quote="Dawn Brew is my go-to spot for breakfast meetings. The fresh pastries and pour-over coffee always impress my clients. Plus, the wifi is reliable and the ambiance is perfect for discussions."
            name="Michael Chen"
            role="Marketing Executive"
          />
          
          <Testimonial
            quote="I've tried breakfast spots all over the city, and Dawn Brew Bistro stands out for quality and consistency. Their pancake stack with fresh berries is simply divine!"
            name="Sarah Rodriguez"
            role="Food Blogger"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
