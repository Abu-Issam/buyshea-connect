
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format price with Ghana Cedis (₵) or $ symbol
  const formatPrice = (price: number) => {
    return `₵${price.toFixed(2)}`;
  };
  
  // Function to render stars
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < Math.floor(rating) 
              ? "text-amber-500 fill-amber-500" 
              : i < rating 
                ? "text-amber-500 fill-amber-500/50" 
                : "text-muted stroke-1"
          )}
        />
      ));
  };
  
  return (
    <div 
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-300",
        featured ? "col-span-1 md:col-span-2" : "col-span-1",
        "bg-card hover:shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={3/4}>
            <div className={cn(
              "absolute inset-0",
              !imageLoaded && "image-loading"
            )} />
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                "object-cover w-full h-full transition-transform duration-700 ease-in-out",
                isHovered && "scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </AspectRatio>
          
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium py-1 px-2 rounded-md z-10">
              NEW
            </span>
          )}
          
          <Button 
            size="icon" 
            variant="secondary" 
            className={cn(
              "absolute top-2 right-2 opacity-0 transform translate-y-1 transition-all duration-300 z-10 rounded-full",
              isHovered && "opacity-100 translate-y-0"
            )}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <h3 className="font-medium mt-1">{product.name}</h3>
            </div>
            <p className="font-medium text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          
          <div className="flex items-center mt-2">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>
      </Link>
      
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-4 transition-transform duration-300 ease-in-out transform translate-y-full",
        isHovered && "translate-y-0"
      )}>
        <Button className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
