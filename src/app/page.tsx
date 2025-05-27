"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Navbar from "@/components/hero/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/hero/AboutSection";
import MenuSection from "@/components/hero/MenuSection";
import ContactSection from "@/components/hero/ContactSection";
import Footer from "@/components/hero/Footer";

export default function Home() {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ContactSection />
        <Footer />
      </div>
  );
}
