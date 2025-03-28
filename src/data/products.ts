
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: "1",
    name: "Pure Organic Shea Butter",
    description: "Our premium unrefined shea butter is sourced directly from women cooperatives in Northern Ghana. Hand-processed using traditional methods, this rich, ivory-colored butter retains all its natural vitamins and fatty acids. Perfect for moisturizing dry skin, reducing inflammation, and promoting skin healing.",
    price: 89.99,
    images: [
      "/images/5994721327065450840.jpg",
      "/images/5994721327065450841.jpg"
    ],
    category: "butter",
    features: [
      "100% organic and unrefined",
      "Rich in vitamins A, E, and F",
      "Multi-purpose for skin, hair, and nails",
      "No artificial additives or preservatives",
      "Sustainably harvested and fair trade certified"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 127,
    isNew: false,
    isFeatured: true,
    weight: "250g"
  },
  {
    id: "2",
    name: "Lavender Infused Shea Soap",
    description: "Gentle cleansing with the soothing scent of lavender. Our hand-crafted shea soap combines premium Ghanaian shea butter with calming lavender essential oil. Creates a rich lather that cleanses without stripping your skin's natural oils.",
    price: 35.99,
    images: [
      "/images/5994721327065450842.jpg"

    ],
    category: "soap",
    features: [
      "Made with 30% unrefined shea butter",
      "Natural lavender essential oil",
      "No synthetic fragrances or colorants",
      "Moisturizing and gentle for all skin types",
      "Handcrafted in small batches"
    ],
    inStock: true,
    rating: 4.6,
    reviews: 84,
    isNew: true,
    isFeatured: false,
    weight: "120g"
  },
  {
    id: "3",
    name: "Shea & Vanilla Body Cream",
    description: "Luxurious body cream blending rich shea butter with warm vanilla. This deeply nourishing formula absorbs quickly, leaving your skin soft, supple, and delicately scented. The perfect daily moisturizer for dry to normal skin.",
    price: 65.99,
    images: [
      "/images/5994721327065450843.jpg"
    ],
    category: "cream",
    features: [
      "Whipped texture for easy application",
      "Long-lasting hydration",
      "Sweet vanilla scent",
      "Non-greasy formula",
      "Fortified with vitamin E"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 59,
    isNew: false,
    isFeatured: true,
    weight: "200g"
  },
  {
    id: "4",
    name: "Cold-Pressed Shea Oil",
    description: "Our lightweight, non-greasy shea oil is extracted through cold-pressing to preserve all beneficial properties. Quickly absorbed, it nourishes deeply while protecting against environmental damage. Perfect as a daily face oil or body treatment.",
    price: 110.99,
    images: [
      "/images/5994721327065450844.jpg"
    ],
    category: "oil",
    features: [
      "100% cold-pressed extraction method",
      "High in essential fatty acids",
      "Suitable for sensitive skin",
      "Multi-purpose for face, body, and hair",
      "Lightweight, fast-absorbing formula"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 42,
    isNew: true,
    isFeatured: false,
    weight: "100ml"
  },
  {
    id: "5",
    name: "Citrus Mint Shea Soap",
    description: "Refreshing soap bar combining zesty citrus oils with cooling mint and moisturizing shea butter. Leaves skin clean, invigorated, and hydrated. The perfect morning shower companion to wake up your senses.",
    price: 35.99,
    images: [
      "/images/5994721327065450845.jpg"
    ],
    category: "soap",
    features: [
      "Energizing citrus and mint essential oils",
      "Made with 30% unrefined shea butter",
      "Gentle exfoliating properties",
      "No artificial colors or preservatives",
      "Handmade in small batches"
    ],
    inStock: true,
    rating: 4.5,
    reviews: 38,
    isNew: false,
    isFeatured: false,
    weight: "120g"
  },
  {
    id: "6",
    name: "Whipped Shea Body Butter",
    description: "Luxuriously light whipped shea butter that melts on contact with skin. This intensive moisturizer is perfect for extremely dry skin, leaving it soft, smooth, and hydrated for up to 24 hours. The airy texture makes application a dream.",
    price: 75.99,
    images: [
      "/images/5994721327065450846.jpg"
    ],
    category: "butter",
    features: [
      "Whipped to a light, fluffy texture",
      "Extra concentrated formula",
      "Unscented option for sensitive skin",
      "Absorbs completely with no greasy residue",
      "Ideal for rough areas like elbows and heels"
    ],
    inStock: true,
    rating: 4.9,
    reviews: 63,
    isNew: true,
    isFeatured: true,
    weight: "180g",
  },
  
  {
    id: "7",
    name: "Coconut Shea Hair Mask",
    description: "Intensive hair treatment combining the hydrating power of shea butter with nourishing coconut oil. This deep conditioning mask repairs damaged strands, tames frizz, and adds brilliant shine. Perfect for all hair types, especially dry or color-treated hair.",
    price: 58.99,
    images: [
      "/images/5994721327065450840.jpg"
    ],
    category: "cream",
    features: [
      "Deep conditioning formula",
      "Coconut oil for additional moisture",
      "Heat-activated for deeper penetration",
      "Fortified with vitamin B5",
      "Free from silicones and parabens"
    ],
    inStock: true,
    rating: 4.7,
    reviews: 51,
    isNew: false,
    isFeatured: false,
    weight: "250g"
  },
  {
    id: "8",
    name: "Shea & Argan Oil Serum",
    description: "Powerful blend of shea and argan oils in a lightweight serum. This fast-absorbing treatment delivers intense hydration while fighting signs of aging. Use on face, hair ends, or cuticles for a boost of nourishment.",
    price: 120.99,
    images: [
      "/images/5994721327065450843.jpg"
    ],
    category: "oil",
    features: [
      "Combination of premium shea and argan oils",
      "Vitamin E for antioxidant protection",
      "Anti-aging properties",
      "Absorbs quickly with no oily residue",
      "Universal formula for face, hair, and nails"
    ],
    inStock: true,
    rating: 4.8,
    reviews: 35,
    isNew: true,
    isFeatured: false,
    weight: "30ml"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};
