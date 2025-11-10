import { Link } from 'react-router-dom';
import { useState } from 'react';
import PurchaseWalkthrough from '../components/ecommerce/PurchaseWalkthrough';

const products = [
  {
    id: 'smart-thermostat-pro',
    name: 'Smart Thermostat Pro',
    price: 249.99,
    description: 'Wi-Fi enabled smart thermostat with learning capabilities',
    category: 'Smart Controls',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e5c09?w=800&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 'vrf-system',
    name: 'VRF System',
    price: 3499.99,
    description: 'Variable Refrigerant Flow system for commercial spaces',
    category: 'VRF / VRV Systems',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a3bc309b5?w=800&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: 'ductable-ac',
    name: 'Ductable AC Unit',
    price: 1999.99,
    description: 'High-capacity ductable air conditioner for large spaces',
    category: 'Ductable ACs',
    image: 'https://images.unsplash.com/photo-1563923089393-2a6a6719ef6e?w=800&auto=format&fit=crop',
    rating: 4.5,
    reviewCount: 156
  },
  {
    id: 'ahu-unit',
    name: 'Air Handling Unit',
    price: 4299.99,
    description: 'Commercial grade air handling unit with advanced filtration',
    category: 'AHU / FCU',
    image: 'https://images.unsplash.com/photo-1581093057306-a0d5ae9a2c9a?w=800&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 67
  },
  {
    id: 'copper-pipes',
    name: 'Copper Piping Kit',
    price: 149.99,
    description: 'High-quality copper pipes for refrigerant lines',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1600568906660-b355bd5ca98d?w=800&auto=format&fit=crop',
    rating: 4.6,
    reviewCount: 213
  },
  {
    id: 'insulation-tubes',
    name: 'Insulation Tubes',
    price: 79.99,
    description: 'Thermal insulation for refrigerant piping',
    category: 'Insulation',
    image: 'https://images.unsplash.com/photo-1620641781197-0e8c3c7e3b5d?w=800&auto=format&fit=crop',
    rating: 4.4,
    reviewCount: 178
  }
];

export default function Products() {
  const categories = [
    'All Products',
    'VRF / VRV Systems',
    'Ductable ACs',
    'AHU / FCU',
    'Smart Controls',
    'Accessories',
    'Insulation'
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Our Products
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          High-quality HVAC solutions for residential and commercial applications
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              onClick={() => {}}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/products/${product.id}`}
            className="group"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Add this component to your Products page where you want the walkthrough to appear
// For example, you can add it at the bottom of your Products component's JSX
// <PurchaseWalkthrough onClose={() => {}} />
