
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Heart, Leaf, Award, Globe } from "lucide-react";

const About = () => {
  const timeline = [
    {
      year: "2015",
      title: "Founded in Ghana",
      description: "BuyShea was established with a vision to bring authentic Ghanaian shea products to global markets."
    },
    {
      year: "2017",
      title: "Women's Cooperative Partnership",
      description: "Partnered with five women's cooperatives across northern Ghana, establishing direct trade relationships."
    },
    {
      year: "2019",
      title: "Organic Certification",
      description: "Obtained organic certification for all our product lines, ensuring the highest quality standards."
    },
    {
      year: "2021",
      title: "E-commerce Launch",
      description: "Launched our direct-to-consumer platform, making authentic shea products available worldwide."
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description: "Implemented our comprehensive sustainability program focusing on environmental protection and community development."
    }
  ];

  const team = [
    {
      name: "Akosua Mensah",
      role: "Founder & CEO",
      bio: "With over 15 years of experience in sustainable agriculture and community development, Akosua founded BuyShea to empower women producers.",
      image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Kwame Osei",
      role: "Production Director",
      bio: "Kwame oversees all aspects of production, ensuring quality control and sustainable harvesting practices.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Abena Dufie",
      role: "Community Relations",
      bio: "Abena works directly with women's cooperatives, helping to develop fair trade practices and community initiatives.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const values = [
    {
      title: "Authenticity",
      description: "We preserve traditional methods while meeting modern quality standards.",
      icon: Award
    },
    {
      title: "Sustainability",
      description: "We're committed to environmentally responsible harvesting and production.",
      icon: Leaf
    },
    {
      title: "Community",
      description: "We empower local communities through fair trade and economic opportunities.",
      icon: Users
    },
    {
      title: "Transparency",
      description: "We believe in honesty about our products, processes, and pricing.",
      icon: Heart
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Our Story
            </span>
            <h1 className="mt-1 mb-6">About BuyShea</h1>
            <p className="text-xl mb-6">
              Connecting traditional Ghanaian shea producers with customers who appreciate authentic, natural skincare.
            </p>
            <Button asChild size="lg">
              <Link to="/products" className="gap-2">
                Explore Our Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1604935863448-21ebf4e50935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Women producing shea butter"
                className="rounded-xl h-[500px] w-full object-cover object-center shadow-lg"
              />
            </div>
            <div>
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Our Mission
              </span>
              <h2 className="mt-1 mb-6">Empowering Communities Through Tradition</h2>
              <p className="mb-6">
                BuyShea was founded with a simple but powerful mission: to connect the skilled women of Ghana's shea industry with the global market, while preserving traditional production methods and ensuring fair compensation.
              </p>
              <p className="mb-6">
                We believe that authentic shea products, made with care and traditional knowledge, deserve to be valued and shared with the world. Each purchase supports not just a product, but a centuries-old tradition and the communities that maintain it.
              </p>
              <p>
                Our direct partnerships with women's cooperatives ensure that producers receive fair compensation for their work, while our commitment to sustainability means we protect the natural environment that makes this all possible.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              What We Stand For
            </span>
            <h2 className="mt-1 mb-6">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              These principles guide everything we do, from how we source our shea nuts to how we package our products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-card p-6 rounded-xl shadow-sm border"
              >
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 px-4 bg-shea-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Our Journey
            </span>
            <h2 className="mt-1 mb-6">From Ghana to the World</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Following our path from a small idea to an international brand committed to quality and sustainability.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
            
            <div className="relative z-10">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`mb-12 flex items-center justify-between ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-5/12 px-2"></div>
                  <div className="z-20 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-medium shadow-md">
                    {item.year.slice(2)}
                  </div>
                  <div className={`w-5/12 px-2 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <div className="p-4 bg-card rounded-lg shadow-sm border">
                      <div className="font-medium text-primary mb-1">{item.year}</div>
                      <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Meet Our Team
            </span>
            <h2 className="mt-1 mb-6">The People Behind BuyShea</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Our dedicated team combines expertise in shea production, community development, and sustainable business practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl overflow-hidden shadow-sm border"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="mb-6">Experience the BuyShea Difference</h2>
          <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
            Discover our range of authentic, sustainable shea products and join us in supporting Ghanaian communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/products">
                Shop Products
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
