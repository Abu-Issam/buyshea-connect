
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/ProductGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, ArrowLeft, Star, Minus, Plus, CheckCircle, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { getProductById, products } from '@/data/products';
import { toast } from '@/components/ui/sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    if (id) {
      const productData = getProductById(id);
      setProduct(productData || null);
      
      // Get related products (same category)
      if (productData) {
        const related = products
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      toast.success(`${product?.name} added to cart`, {
        description: `Quantity: ${quantity}`,
      });
    }, 800);
  };
  
  // Format price with Ghana Cedis (₵) symbol
  const formatPrice = (price: number) => {
    return `₵${price.toFixed(2)}`;
  };
  
  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-amber-500 fill-amber-500"
              : i < rating
                ? "text-amber-500 fill-amber-500/50"
                : "text-muted stroke-1"
          }`}
        />
      ));
  };
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4">
            <h2 className="mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link to="/products">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-secondary py-4 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span className="mx-2">/</span>
            <Link 
              to={`/products?category=${product.category}`} 
              className="hover:text-primary capitalize"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden h-[500px] bg-secondary">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} - View ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`relative rounded-md overflow-hidden h-20 w-20 ${
                        index === currentImage 
                          ? "ring-2 ring-primary" 
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="animate-fade-in-right">
              {product.isNew && (
                <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-md text-sm font-medium mb-4">
                  NEW
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl font-medium mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-medium text-primary mb-6">
                {formatPrice(product.price)}
              </p>
              
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {product.weight && (
                <p className="text-sm text-muted-foreground mb-6">
                  Weight: {product.weight}
                </p>
              )}
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                      Adding...
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="pt-6 border-t">
                <Tabs defaultValue="description">
                  <TabsList className="w-full">
                    <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                    <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="pt-4">
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                  </TabsContent>
                  <TabsContent value="details" className="pt-4">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Category</td>
                          <td className="py-2 capitalize">{product.category}</td>
                        </tr>
                        {product.weight && (
                          <tr className="border-b">
                            <td className="py-2 font-medium">Weight</td>
                            <td className="py-2">{product.weight}</td>
                          </tr>
                        )}
                        {product.dimensions && (
                          <tr className="border-b">
                            <td className="py-2 font-medium">Dimensions</td>
                            <td className="py-2">{product.dimensions}</td>
                          </tr>
                        )}
                        <tr className="border-b">
                          <td className="py-2 font-medium">In Stock</td>
                          <td className="py-2">{product.inStock ? "Yes" : "No"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </TabsContent>
                  <TabsContent value="shipping" className="pt-4">
                    <p className="text-muted-foreground mb-4">
                      We offer the following shipping options for our customers:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Standard Shipping (3-5 business days):</span>
                          <p className="text-muted-foreground">
                            ₵20 for orders under ₵100, Free for orders over ₵100.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">Express Shipping (1-2 business days):</span>
                          <p className="text-muted-foreground">
                            ₵35 for all orders.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        <div>
                          <span className="font-medium">International Shipping:</span>
                          <p className="text-muted-foreground">
                            Calculated at checkout based on location.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 px-4 bg-secondary/50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium">Related Products</h2>
              <Link to="/products">
                <Button variant="ghost">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
