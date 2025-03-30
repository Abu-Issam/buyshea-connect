# BuyShea - E-commerce Platform

BuyShea is a modern e-commerce platform connecting Ghanaian shea producers with global customers, built with React, TypeScript, and Vite.

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **Routing**: React Router
- **Payment Integration**: Paystack
- **UI Components**: Custom components with shadcn/ui

## Key Features

- **Product Catalog**: Browse shea products by category
- **Product Details**: Detailed view with images, descriptions, and related products
- **Shopping Cart**: Add/remove items, adjust quantities
- **User Authentication**: Login and registration functionality
- **Payment Integration**: Secure payments via Paystack
- **Responsive Design**: Mobile-first approach
- **Real-time Notifications**: Toast notifications for user feedback

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abu-Issam/buyshea-connect.git
cd buyshea-connect
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React hooks guidelines
- Implement component-based architecture
- Use shadcn/ui components for consistent UI



### Type Definitions

Key interfaces include:

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'butter' | 'oil' | 'soap' | 'cream' | 'other';
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}
```


2. **Custom Domain**:
   - Currently not supported directly
   - Use Netlify for custom domain deployment
   - 

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

