import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com',"img.wongnai.com", 'grgulqoyqeofcykrcesw.supabase.co'],
    minimumCacheTTL: 360,
  },
};

export default nextConfig;
