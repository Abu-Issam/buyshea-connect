
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
      isScrolled 
        ? "py-3 backdrop-blur-md bg-background/80 shadow-sm" 
        : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-medium tracking-tight flex items-center"
          >
            <span className="text-primary mr-1">Buy</span>
            <span>Shea</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-base transition-colors hover:text-primary",
                location.pathname === "/" && "text-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "text-base transition-colors hover:text-primary",
                location.pathname.includes("/products") && "text-primary font-medium"
              )}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-base transition-colors hover:text-primary",
                location.pathname === "/about" && "text-primary font-medium"
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-base transition-colors hover:text-primary",
                location.pathname === "/contact" && "text-primary font-medium"
              )}
            >
              Contact
            </Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {searchOpen ? (
              <div className="relative animate-fade-in">
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-48 pl-3 pr-8 py-1 rounded-full" 
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSearchOpen(true)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in bg-background border-t mt-3 py-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={cn(
                "text-base py-2 px-3 rounded-md transition-colors",
                location.pathname === "/" 
                  ? "bg-secondary text-primary font-medium" 
                  : "hover:bg-secondary/50"
              )}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "text-base py-2 px-3 rounded-md transition-colors",
                location.pathname.includes("/products") 
                  ? "bg-secondary text-primary font-medium" 
                  : "hover:bg-secondary/50"
              )}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-base py-2 px-3 rounded-md transition-colors",
                location.pathname === "/about" 
                  ? "bg-secondary text-primary font-medium" 
                  : "hover:bg-secondary/50"
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-base py-2 px-3 rounded-md transition-colors",
                location.pathname === "/contact" 
                  ? "bg-secondary text-primary font-medium" 
                  : "hover:bg-secondary/50"
              )}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className={cn(
                "text-base py-2 px-3 rounded-md transition-colors",
                location.pathname === "/login" 
                  ? "bg-secondary text-primary font-medium" 
                  : "hover:bg-secondary/50"
              )}
            >
              Login / Register
            </Link>
            <div className="relative mt-2">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10" 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
