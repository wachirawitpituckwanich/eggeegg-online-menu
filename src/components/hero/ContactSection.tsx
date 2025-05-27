
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="location" className="bg-white px-2 py-6">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">Visit Us</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          <div>
            <Card className="border-none shadow-md overflow-hidden h-full">
              <div className="aspect-video w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393.63105025340093!2d102.04825727561634!3d14.959149398636875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311eb3badadc07a9%3A0x9c551f81ace109e8!2z4LmA4Lit4LmJ4LiB4Lit4Li14LmA4Lit4LmJ4LiB!5e0!3m2!1sth!2sth!4v1746608234347!5m2!1sth!2sth" 
                  className="w-full h-full" 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Dawn Brew Bistro</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>123 Sunrise Avenue</p>
                  <p>San Francisco, CA 94103</p>
                  <p className="pt-2">Phone: (555) 123-4567</p>
                  <p>Email: hello@dawnbrewbistro.com</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-lg mb-2">Hours</h4>
                  <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                    <div>Monday - Friday</div>
                    <div>6:30 AM - 4:00 PM</div>
                    <div>Saturday - Sunday</div>
                    <div>7:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
