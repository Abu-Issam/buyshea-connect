
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Check } from 'lucide-react';
import { getFeaturedProducts, getNewProducts } from '@/data/products';

const features = [
  {
    title: "100% Pure & Natural",
    description: "Our products contain only natural ingredients with no synthetic additives or harsh chemicals.",
    icon: Check
  },
  {
    title: "Ethically Sourced",
    description: "We work directly with women's cooperatives in Ghana to ensure fair compensation and sustainable practices.",
    icon: Check
  },
  {
    title: "Multi-Purpose Care",
    description: "Our versatile shea products can be used for skin, hair, and body care applications.",
    icon: Check
  }
];

const testimonials = [
  {
    content: "The quality of BuyShea's products is exceptional. The raw shea butter has completely transformed my skincare routine.",
    author: "Amina K.",
    role: "Verified Customer",
    rating: 5
  },
  {
    content: "As someone with sensitive skin, I've struggled to find products that work. This shea butter is gentle yet effective.",
    author: "David T.",
    role: "Verified Customer",
    rating: 5
  },
  {
    content: "The fact that I'm directly supporting Ghanaian women producers makes using these products even more special.",
    author: "Sarah M.",
    role: "Verified Customer",
    rating: 4
  }
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedProducts());
  const [newProducts, setNewProducts] = useState(getNewProducts());
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Our Collection
              </span>
              <h2 className="mt-1">Featured Products</h2>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="mt-4 md:mt-0">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid 
            products={featuredProducts} 
            columns={3}
            featuredIndex={[0, 3]}
          />
        </div>
      </section>
      
      {/* About Section */}
      <section className="bg-shea-50 py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/5994721327065450842.jpg"                 
                alt="Shea production in Ghana" 
                className="rounded-xl h-[500px] w-full object-cover object-center shadow-lg"
              />
            </div>
            <div className="animate-fade-in-right">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="mt-1 mb-6">From Ghana's Savannah to You</h2>
              <p className="mb-4 text-lg">
                BuyShea connects traditional Ghanaian producers with customers worldwide who appreciate authentic, natural skincare products. 
              </p>
              <p className="mb-6">
                Each purchase supports local communities and sustains traditional knowledge passed down through generations. We work directly with women's cooperatives to ensure fair prices and sustainable harvesting practices.
              </p>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-4 bg-primary/10 p-1.5 rounded-full">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/about">
                <Button size="lg">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Fresh From Ghana
            </span>
            <h2 className="mt-1">New Arrivals</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Discover our latest shea products, crafted with care and delivered fresh from the source.
            </p>
          </div>
          
          <ProductGrid 
            products={newProducts} 
            columns={4}
          />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-shea-100 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Customer Love
            </span>
            <h2 className="mt-1">What People Say About Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-sm animate-fade-in opacity-0"
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  animationFillMode: 'forwards' 
                }}
              >
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                <p className="italic mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="shadow-md">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, skincare tips, and to learn more about the benefits of shea butter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-lg border border-border bg-card flex-1"
            />
            <Button className="whitespace-nowrap" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
