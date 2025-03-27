import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Banknote, AlertCircle } from 'lucide-react';
import { products } from '@/data/products';
import { CartItem, Product } from '@/types';
import { toast } from '@/lib/sonner-toast';

// Mock cart data
const initialCart: CartItem[] = [
  { product: products[0], quantity: 1 },
  { product: products[2], quantity: 2 },
];

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  // Shipping cost
  const shippingCost = subtotal > 100 ? 0 : 20;
  
  // Total cost
  const total = subtotal + shippingCost;
  
  // Format price
  const formatPrice = (price: number) => {
    return `₵${price.toFixed(2)}`;
  };
  
  // Update quantity
  const updateQuantity = (id: string, amount: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };
  
  // Remove item
  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
    toast.success("Item removed from cart");
  };
  
  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Checkout successful!", {
        description: "Your order has been placed.",
      });
      setCart([]);
      setIsCheckingOut(false);
    }, 2000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-medium mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground mb-8">
            Review your items and proceed to checkout
          </p>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                  {/* Items */}
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={item.product.id} className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <Link to={`/products/${item.product.id}`}>
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full sm:w-24 h-24 object-cover rounded-md"
                              />
                            </Link>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between">
                              {/* Product Details */}
                              <div>
                                <Link to={`/products/${item.product.id}`}>
                                  <h3 className="font-medium hover:text-primary transition-colors">
                                    {item.product.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground capitalize mb-2">
                                  {item.product.category}
                                </p>
                                {item.product.weight && (
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Weight: {item.product.weight}
                                  </p>
                                )}
                              </div>
                              
                              {/* Price */}
                              <div className="mt-2 sm:mt-0 text-primary font-medium">
                                {formatPrice(item.product.price)}
                              </div>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="px-2 py-1 text-muted-foreground hover:text-foreground"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-1 text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="px-2 py-1 text-muted-foreground hover:text-foreground"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Continue Shopping */}
                  <div className="bg-muted/50 p-4 sm:p-6">
                    <Link to="/products">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg shadow-sm p-6 h-fit sticky top-24">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shippingCost === 0 
                          ? "Free" 
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    {subtotal < 100 && (
                      <div className="text-sm text-muted-foreground bg-secondary p-3 rounded-md flex items-start mt-2">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        Add {formatPrice(100 - subtotal)} more to qualify for free shipping
                      </div>
                    )}
                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full mb-4"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        Checkout
                        <CreditCard className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Secure payment</span>
                    </div>
                    <div className="flex items-center">
                      <Banknote className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>We accept Mobile Money and Credit Cards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products">
                <Button>
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Cart;
