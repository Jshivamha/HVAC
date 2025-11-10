import { useState, useEffect } from 'react';
import { XMarkIcon, ShoppingBagIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    id: 'browse',
    title: 'Browse Products',
    description: 'Explore our range of HVAC products and find what you need.',
    icon: ShoppingBagIcon,
    cta: 'View Products',
    path: '/products'
  },
  {
    id: 'select',
    title: 'Select Product',
    description: 'Click on any product to view details, choose options, and add to cart.',
    icon: ShoppingBagIcon,
    cta: 'Select Product',
    path: '/products/smart-thermostat-pro' // Default to a specific product for demo
  },
  {
    id: 'checkout',
    title: 'Checkout',
    description: 'Review your cart and proceed to secure checkout.',
    icon: CreditCardIcon,
    cta: 'Proceed to Checkout',
    path: '/checkout'
  },
  {
    id: 'complete',
    title: 'Complete Purchase',
    description: 'Enter your payment details and complete your purchase securely.',
    icon: CheckCircleIcon,
    cta: 'Complete Purchase',
    path: '/checkout'
  }
];

export default function PurchaseWalkthrough({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Auto-advance the walkthrough every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Show walkthrough"
        >
          <ShoppingBagIcon className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
        <h3 className="font-medium">Purchase Guide</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsMinimized(true)}
            className="text-white hover:text-gray-200"
            aria-label="Minimize"
          >
            <span className="text-sm">_</span>
          </button>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0 bg-primary-100 p-2 rounded-full">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{currentStepData.title}</h4>
            <p className="text-sm text-gray-500">{currentStepData.description}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-1.5 w-6 rounded-full ${index === currentStep ? 'bg-primary-600' : 'bg-gray-300'}`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          
          <a
            href={currentStepData.path}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {currentStepData.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
