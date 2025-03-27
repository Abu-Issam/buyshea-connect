
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { products, getProductsByCategory } from '@/data/products';
import { Product, ProductCategory } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const categories: { label: string; value: ProductCategory }[] = [
  { label: 'All Products', value: 'all' },
  { label: 'Shea Butter', value: 'butter' },
  { label: 'Shea Oils', value: 'oil' },
  { label: 'Soaps', value: 'soap' },
  { label: 'Creams & Lotions', value: 'cream' },
  { label: 'Other Products', value: 'other' },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Rating', value: 'rating' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [activeSort, setActiveSort] = useState('newest');
  
  // Get category from URL or default to 'all'
  const categoryParam = searchParams.get('category') as ProductCategory || 'all';
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(categoryParam);
  
  // Apply category filter from URL on component mount
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);
  
  // Apply filters whenever dependencies change
  useEffect(() => {
    // Filter by category
    let filtered = activeCategory === 'all' 
      ? [...products] 
      : getProductsByCategory(activeCategory);
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (activeSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered = filtered.filter(p => p.isNew).concat(filtered.filter(p => !p.isNew));
        break;
    }
    
    setDisplayProducts(filtered);
  }, [activeCategory, searchQuery, priceRange, activeSort]);
  
  // Handle category change
  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
    // Update URL
    searchParams.set('category', category);
    if (category === 'all') searchParams.delete('category');
    setSearchParams(searchParams);
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFiltersOpen(false);
  };
  
  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 200]);
    handleCategoryChange('all');
    setActiveSort('newest');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-shea-50">
        <div className="container mx-auto text-center">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Authentic Ghanaian
          </span>
          <h1 className="mt-1 mb-4">Our Products</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Discover our premium range of natural shea products, made with care by skilled artisans in Ghana.
          </p>
        </div>
      </section>
      
      {/* Product Catalog */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-2 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeCategory === category.value
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
                
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="mb-4">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={200}
                    step={1}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">₵{priceRange[0]}</span>
                    <span className="text-sm">₵{priceRange[1]}</span>
                  </div>
                </div>
                
                <form onSubmit={handleSearch} className="mb-8">
                  <h3 className="font-medium mb-4">Search</h3>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </form>
                
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Products */}
            <div className="flex-1">
              {/* Mobile Filters Button & Sorting */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="sm:w-auto justify-between lg:hidden"
                >
                  <span>Filter & Sort</span>
                  <SlidersHorizontal className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={activeSort === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveSort(option.value)}
                      className="text-xs"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Filters Panel */}
              {filtersOpen && (
                <div className="lg:hidden mb-6 p-4 border rounded-lg bg-card animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setFiltersOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category.value}
                            variant={activeCategory === category.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryChange(category.value)}
                          >
                            {category.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Price Range</h4>
                      <Slider
                        value={priceRange}
                        min={0}
                        max={200}
                        step={1}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">₵{priceRange[0]}</span>
                        <span className="text-sm">₵{priceRange[1]}</span>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSearch}>
                      <h4 className="font-medium mb-2 text-sm">Search</h4>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10"
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <Search className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </form>
                    
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Results Summary */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {displayProducts.length} {displayProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              
              {/* Products Grid */}
              {displayProducts.length > 0 ? (
                <ProductGrid 
                  products={displayProducts} 
                  columns={3} 
                />
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search criteria.
                  </p>
                  <Button onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
