
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  columns?: number;
  featuredIndex?: number[];
}

export function ProductGrid({ 
  products, 
  columns = 3,
  featuredIndex = []
}: ProductGridProps) {
  // Create animation delay for grid items
  const getAnimationDelay = (index: number) => {
    return `${0.05 * (index % (columns * 2))}s`;
  };
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {products.map((product, index) => (
        <div 
          key={product.id}
          className="animate-fade-in opacity-0"
          style={{ 
            animationDelay: getAnimationDelay(index),
            animationFillMode: 'forwards' 
          }}
        >
          <ProductCard 
            product={product} 
            featured={featuredIndex.includes(index)}
          />
        </div>
      ))}
    </div>
  );
}
