
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-medium tracking-tight inline-block mb-4">
              <span className="text-primary mr-1">Buy</span>
              <span>Shea</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Premium Ghanaian shea products made with traditional methods and modern standards.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="outline" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=butter" className="text-muted-foreground hover:text-primary transition-colors">
                  Shea Butter
                </Link>
              </li>
              <li>
                <Link to="/products?category=oil" className="text-muted-foreground hover:text-primary transition-colors">
                  Shea Oils
                </Link>
              </li>
              <li>
                <Link to="/products?category=soap" className="text-muted-foreground hover:text-primary transition-colors">
                  Soaps
                </Link>
              </li>
              <li>
                <Link to="/products?category=cream" className="text-muted-foreground hover:text-primary transition-colors">
                  Creams & Lotions
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/producers" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Producers
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-muted-foreground hover:text-primary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
              />
              <Button>Subscribe</Button>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  123 Shea Blvd, Accra, Ghana
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">
                  +233 12 345 6789
                </p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-muted-foreground">
                  info@buyshea.com
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} BuyShea. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
