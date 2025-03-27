
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const heroBackgrounds = [
  "images/5994721327065450840.jpg",
  "images/5994721327065450842.jpg",
];

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextBgLoaded, setNextBgLoaded] = useState(false);
  
  // Preload next image
  useEffect(() => {
    const nextIndex = (currentBg + 1) % heroBackgrounds.length;
    const img = new Image();
    img.src = heroBackgrounds[nextIndex];
    img.onload = () => setNextBgLoaded(true);
  }, [currentBg]);
  
  // Rotate backgrounds
  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      if (nextBgLoaded) {
        setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
        setNextBgLoaded(false);
      }
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isLoaded, nextBgLoaded]);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroBackgrounds.map((bg, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentBg ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: index === currentBg ? 0 : -1
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 dark:from-background/95 dark:to-background/60" />
      
      {/* Image loader */}
      <img 
        src={heroBackgrounds[0]} 
        alt="" 
        className="hidden" 
        onLoad={() => setIsLoaded(true)} 
      />
      
      <div className="container mx-auto px-4 relative z-10 mt-16">
        <div className="max-w-3xl">
          <span className="inline-block animate-fade-in opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards] py-1 px-4 mb-4 rounded-full bg-accent text-accent-foreground text-sm font-medium tracking-wide">
            Premium Ghanaian Shea Products
          </span>
          
          <h1 className="animate-fade-in opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards] mb-6 leading-tight">
            Pure Natural Beauty <br/> Handcrafted with Care
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-xl animate-fade-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
            Discover the finest shea butter, oils, and soaps sourced directly from Ghana's expert producers. Ethically made, naturally effective.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in opacity-0 [animation-delay:0.8s] [animation-fill-mode:forwards]">
            <Link to="/products">
              <Button size="lg" className="transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="transition-all duration-300 ease-in-out hover:bg-secondary">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
