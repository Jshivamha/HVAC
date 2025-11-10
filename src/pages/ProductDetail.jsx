import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/cartContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/products/${productId}`);
        // const data = await response.json();
        
        // Mock data
        setTimeout(() => {
          const mockProduct = {
            id: productId,
            name: 'HVAC Smart Thermostat Pro',
            price: 249.99,
            description: 'A smart thermostat that learns your schedule and preferences to help save energy and keep you comfortable.',
            features: [
              'Wi-Fi enabled with mobile app control',
              'Energy usage reports',
              'Geofencing technology',
              'Voice control compatible',
              'Professional installation recommended'
            ],
            images: [
              'https://images.unsplash.com/photo-1611186871348-b1ce696e5c09?w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1602810319336-d2f683b3d8ef?w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800&auto=format&fit=crop'
            ],
            variants: [
              { id: '1', name: 'White', color: 'bg-white', selectedColor: 'ring-gray-400' },
              { id: '2', name: 'Black', color: 'bg-gray-900', selectedColor: 'ring-gray-700' },
              { id: '3', name: 'Silver', color: 'bg-gray-400', selectedColor: 'ring-gray-500' },
            ],
            rating: 4.8,
            reviewCount: 124,
            inStock: true
          };
          
          setProduct(mockProduct);
          setSelectedVariant(mockProduct.variants[0]);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    const item = {
      id: `${product.id}-${selectedVariant.id}`,
      name: product.name,
      price: product.price,
      variant: selectedVariant.name,
      quantity,
      image: product.images[0]
    };
    
    addToCart(item);
    // Analytics event
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        items: [{
          item_id: item.id,
          item_name: item.name,
          item_variant: item.variant,
          quantity: item.quantity,
          price: item.price
        }]
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const [currentStep, setCurrentStep] = useState('product');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card'); // Default to card payment

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;
  if (!product) return <div className="text-center mt-8">Product not found</div>;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  const handleProceedToCheckout = () => {
    setCurrentStep('checkout');
    // Analytics
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: product.price * quantity,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_variant: selectedVariant?.name,
          quantity: quantity,
          price: product.price
        }]
      });
    }
  };

  const handlePayment = async (paymentMethod) => {
    setIsLoading(true);
    setPaymentStatus(null);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 80% success rate for demo
      const isSuccess = Math.random() < 0.8;
      
      if (isSuccess) {
        setPaymentStatus('success');
        // Clear cart and create order
        handleAddToCart();
        setCurrentStep('confirmation');
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'checkout':
        return (
          <motion.div 
            key="checkout"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                <button 
                  onClick={() => setCurrentStep('product')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                        Payment Method
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Secure
                      </span>
                    </div>
                    
                    {/* Payment Tabs */}
                    <div className="mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-between sm:justify-start space-x-1 sm:space-x-8 overflow-x-auto pb-1">
                          {[
                            { id: 'card', label: 'Card', icon: 'credit-card' },
                            { id: 'upi', label: 'UPI', icon: 'currency-rupee' },
                            { id: 'wallet', label: 'Wallets', icon: 'wallet' },
                            { id: 'netbanking', label: 'Net Banking', icon: 'banknotes' },
                            { id: 'emi', label: 'EMI', icon: 'calendar' }
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setSelectedPayment(tab.id)}
                              className={`group relative flex items-center px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                selectedPayment === tab.id
                                  ? 'text-primary-600'
                                  : 'text-gray-500 hover:text-gray-700'
                              }`}
                            >
                              <span className="relative z-10 flex items-center">
                                <svg
                                  className={`-ml-0.5 mr-2 h-5 w-5 transition-colors duration-200 ${
                                    selectedPayment === tab.id ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  {tab.id === 'card' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                  )}
                                  {tab.id === 'upi' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8h2m-2 3h2m-5 3h2m-2 3h2m-5 0h2m-2-3h2m-2-3h2m-1-5a1 1 0 11-2 0 1 1 0 012 0zM4 15a1 1 0 100-2 1 1 0 000 2zm0 0v2a1 1 0 102 0v-2m-2 0h2m-2 0H3m12 0h2m2 0h-2m0 0v2a1 1 0 01-2 0v-2m0 0h-2m2 0h-2" />
                                  )}
                                  {tab.id === 'wallet' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                  )}
                                  {tab.id === 'netbanking' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                  )}
                                  {tab.id === 'emi' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                  )}
                                </svg>
                                {tab.label}
                              </span>
                              <span 
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transition-all duration-300 transform ${
                                  selectedPayment === tab.id ? 'scale-100' : 'scale-0'
                                }`}
                              ></span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Payment */}
                    {selectedPayment === 'card' && (
                      <div className="space-y-6">
                        {/* Card Preview */}
                        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white overflow-hidden">
                          <div className="absolute top-4 right-4 text-2xl">
                            <div className="w-12 h-8 bg-white/20 rounded-md flex items-center justify-center">
                              <span className="text-white text-sm font-bold">VISA</span>
                            </div>
                          </div>
                          <div className="mt-6">
                            <div className="text-xs text-blue-100 mb-1">CARD NUMBER</div>
                            <div className="text-xl font-mono tracking-wider mb-6">•••• •••• •••• 4242</div>
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-xs text-blue-100 mb-1">CARD HOLDER</div>
                                <div className="text-sm font-medium">JOHN DOE</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-blue-100 mb-1">EXPIRES</div>
                                <div className="text-sm font-medium">12/25</div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                          <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white/5 rounded-full"></div>
                        </div>

                        {/* Card Form */}
                        <div className="space-y-5">
                          <div className="relative">
                            <input
                              type="text"
                              id="card-number"
                              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary-500 transition-colors"
                              placeholder="Card Number"
                            />
                            <label 
                              htmlFor="card-number" 
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Card Number
                            </label>
                            <div className="absolute right-0 top-2 flex space-x-2">
                              {['visa', 'mastercard', 'amex', 'discover'].map((type) => (
                                <div key={type} className="w-8 h-6 bg-gray-200 rounded-sm flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                                  <span className="text-xs font-bold">{type.charAt(0).toUpperCase()}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <input
                                type="text"
                                id="expiry"
                                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="MM/YY"
                              />
                              <label 
                                htmlFor="expiry" 
                                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                              >
                                Expiry Date
                              </label>
                            </div>
                            <div className="relative">
                              <div className="relative">
                                <input
                                  type="text"
                                  id="cvv"
                                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary-500 transition-colors"
                                  placeholder="CVV"
                                />
                                <label 
                                  htmlFor="cvv" 
                                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                  CVV
                                </label>
                                <div className="absolute right-0 top-2 text-gray-400 hover:text-gray-600 cursor-help" title="3-digit security code on the back of your card">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              id="card-name"
                              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary-500 transition-colors"
                              placeholder="Name on Card"
                            />
                            <label 
                              htmlFor="card-name" 
                              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                            >
                              Name on Card
                            </label>
                          </div>

                          <div className="flex items-center pt-2">
                            <div className="flex items-center h-5">
                              <input
                                id="save-card"
                                name="save-card"
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                            </div>
                            <label htmlFor="save-card" className="ml-2 block text-sm text-gray-700">
                              Save card for future payments
                              <span className="text-xs text-gray-500 block">Your card details will be securely stored</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* UPI Payment */}
                    {selectedPayment === 'upi' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                          <div className="flex items-center mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Pay via UPI</h4>
                              <p className="text-sm text-gray-500">Instant payment using any UPI app</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-1">Enter UPI ID</label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <input
                                  type="text"
                                  name="upi-id"
                                  id="upi-id"
                                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md h-11"
                                  placeholder="yourname@upi"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                  <button
                                    type="button"
                                    className="h-full inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                  >
                                    Verify
                                  </button>
                                </div>
                              </div>
                              <p className="mt-1 text-xs text-gray-500">Enter your UPI ID (e.g., name@okbizaxis, 9876543210@ybl)</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-900">Or choose an app</h4>
                            <span className="text-xs text-gray-500">Popular UPI apps</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { name: 'Google Pay', color: 'bg-[#4285F4]', icon: 'G' },
                              { name: 'PhonePe', color: 'bg-[#5F259F]', icon: 'P' },
                              { name: 'Paytm', color: 'bg-[#00BAF2]', icon: 'P' },
                              { name: 'BHIM UPI', color: 'bg-[#FB6E00]', icon: 'B' },
                              { name: 'Amazon Pay', color: 'bg-[#FF9900]', icon: 'A' },
                              { name: 'WhatsApp Pay', color: 'bg-[#25D366]', icon: 'W' },
                              { name: 'Airtel Pay', color: 'bg-[#ED1C24]', icon: 'A' },
                              { name: 'Other UPI App', color: 'bg-gray-100 text-gray-700', icon: '...' },
                            ].map((app) => (
                              <button
                                key={app.name}
                                type="button"
                                className={`group relative p-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 ${app.color.includes('text-') ? app.color : 'text-white'}`}
                                style={{ backgroundColor: app.color === 'bg-gray-100 text-gray-700' ? '#f3f4f6' : app.color }}
                              >
                                <div className="flex flex-col items-center">
                                  <div className={`h-12 w-12 rounded-full ${app.color === 'bg-gray-100 text-gray-700' ? 'bg-white' : 'bg-white/20'} flex items-center justify-center text-xl font-bold mb-2 group-hover:scale-110 transition-transform`}>
                                    {app.icon}
                                  </div>
                                  <span className="text-xs font-medium mt-1">{app.name}</span>
                                </div>
                                <div className="absolute top-2 right-2">
                                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                After clicking 'Pay Now', please complete the payment in your UPI app. Do not close this window until payment is complete.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Wallets */}
                    {selectedPayment === 'wallet' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {[
                            { name: 'Paytm', balance: '₹1,234' },
                            { name: 'Amazon Pay', balance: '₹567' },
                            { name: 'Mobikwik', balance: '₹89' },
                            { name: 'Freecharge', balance: '₹0' },
                          ].map((wallet) => (
                            <div key={wallet.name} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">{wallet.name.charAt(0)}</span>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{wallet.name}</p>
                                <p className="text-xs text-gray-500">Balance: {wallet.balance}</p>
                              </div>
                              <div className="ml-auto">
                                <input
                                  type="radio"
                                  name="wallet"
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Net Banking */}
                    {selectedPayment === 'netbanking' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                          <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            defaultValue=""
                          >
                            <option value="">Select your bank</option>
                            {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'IndusInd Bank', 'Yes Bank'].map((bank) => (
                              <option key={bank} value={bank.toLowerCase().replace(/\s+/g, '-')}>
                                {bank}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="text-xs text-gray-500">
                          You will be redirected to your bank's secure page to complete the payment
                        </div>
                      </div>
                    )}

                    {/* EMI Options */}
                    {selectedPayment === 'emi' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                          <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            defaultValue=""
                          >
                            <option value="">Select your bank</option>
                            <option value="hdfc">HDFC Bank (EMI at 0% interest)</option>
                            <option value="icici">ICICI Bank (EMI at 0% interest)</option>
                            <option value="sbi">SBI Card (EMI at 10% interest)</option>
                            <option value="axis">Axis Bank (EMI at 12% interest)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">EMI Tenure</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[3, 6, 9, 12, 18, 24].map((months) => (
                              <div key={months} className="relative">
                                <input
                                  type="radio"
                                  id={`emi-${months}`}
                                  name="emi-tenure"
                                  className="peer hidden"
                                  defaultChecked={months === 6}
                                />
                                <label
                                  htmlFor={`emi-${months}`}
                                  className="block p-3 text-center border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500"
                                >
                                  <span className="block text-sm font-medium">{months} months</span>
                                  <span className="block text-xs text-gray-500">
                                    ₹{(product.price / months).toFixed(2)}/mo
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            Total amount to be paid: <span className="font-medium">₹{product.price.toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => handlePayment(selectedPayment)}
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                          isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Processing...' : `Pay ₹${product.price.toFixed(2)}`}
                      </button>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        Your payment is secured with 256-bit SSL encryption
                      </p>
                    </div>
                    
                    {paymentStatus === 'failed' && (
                      <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md flex items-start">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Payment failed</p>
                          <p className="text-sm">Your payment could not be processed. Please try again or use a different payment method.</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <button
                        onClick={() => handlePayment('card')}
                        disabled={isLoading}
                        className={`w-full flex items-center justify-between p-4 border-2 rounded-lg transition-colors ${
                          isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:border-primary-500'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-gray-200 rounded-sm mr-3"></div>
                          <span>Credit or Debit Card</span>
                        </div>
                        <span>→</span>
                      </button>
                      
                      <div className="text-xs text-gray-500 mt-2">
                        Test card: 4242 4242 4242 4242 (any future date, any CVC, any postal code)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${(product.price * quantity).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between font-medium text-gray-900">
                          <span>Total</span>
                          <span>${(product.price * quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'confirmation':
        return (
          <motion.div 
            key="confirmation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 text-center py-12"
          >
            <div className="bg-white p-8 rounded-lg max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left mb-8">
                <div className="flex items-center">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {quantity}</p>
                    <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => setCurrentStep('product')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back to Product
                </button>
                <button
                  onClick={() => {
                    navigate('/products');
                  }}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        );
        
      default:
        return (
          <>

            {/* Image Placeholder */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1 lg:pl-8"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="mt-2 text-xl text-primary-600">${product.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => navigate(-1)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <div className="mt-2 text-gray-600 space-y-3">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>


              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>

            {/* Additional Content Sections */}
            <div className="lg:col-span-2 mt-12 space-y-12">
              {/* Product Specifications */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Product Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Technical Details</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Model Number</span> <span className="text-gray-900">HVAC-{product.id.toUpperCase()}</span></li>
                      <li className="flex justify-between"><span>Warranty</span> <span className="text-gray-900">5 Years Limited</span></li>
                      <li className="flex justify-between"><span>Energy Efficiency</span> <span className="text-green-600 font-medium">ENERGY STAR® Certified</span></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Dimensions & Weight</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Height</span> <span className="text-gray-900">12.5 inches</span></li>
                      <li className="flex justify-between"><span>Width</span> <span className="text-gray-900">9.5 inches</span></li>
                      <li className="flex justify-between"><span>Weight</span> <span className="text-gray-900">4.2 lbs</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Related Products */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'smart-thermostat', name: 'Smart Thermostat', price: 199.99 },
                    { id: 'air-filter', name: 'Premium Air Filter', price: 29.99 },
                    { id: 'wifi-adapter', name: 'WiFi Adapter', price: 49.99 },
                    { id: 'maintenance-kit', name: 'Maintenance Kit', price: 79.99 }
                  ].map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400">
                        {item.name}
                      </div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-primary-600 font-medium">${item.price.toFixed(2)}</p>
                      <button 
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="mt-2 w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-md transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support & Resources */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Support & Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Documentation
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><a href="#" className="text-primary-600 hover:underline">User Manual (PDF)</a></li>
                      <li><a href="#" className="text-primary-600 hover:underline">Installation Guide</a></li>
                      <li><a href="#" className="text-primary-600 hover:underline">Troubleshooting</a></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Technical Support
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>24/7 Support: <a href="tel:+18001234567" className="text-primary-600 hover:underline">1-800-123-4567</a></li>
                      <li>Email: <a href="mailto:support@hvacpro.com" className="text-primary-600 hover:underline">support@hvacpro.com</a></li>
                      <li><a href="/contact" className="text-primary-600 hover:underline">Contact Form</a></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Professional Installation
                    </h3>
                    <p className="text-sm text-gray-600">Need professional installation? Our certified technicians are available nationwide.</p>
                    <button className="mt-2 text-sm bg-primary-600 hover:bg-primary-700 text-white py-1 px-3 rounded-md transition-colors">
                      Schedule Installation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div 
            className="lg:grid lg:grid-cols-2 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductDetail;
