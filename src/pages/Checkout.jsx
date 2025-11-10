import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../lib/cartContext.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Mock Stripe public key - in a real app, this would come from your backend
const stripePromise = loadStripe('pk_test_your_publishable_key_here');

// Checkout form component
const CheckoutForm = ({ cart, cartTotal, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // In a real app, you would create a payment intent on your server
      // and handle the payment confirmation there
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     items: cart,
      //     amount: cartTotal * 100, // Convert to cents
      //     currency: 'usd',
      //     billingDetails
      //   }),
      // });
      // const { clientSecret } = await response.json();

      // Mock response for demo purposes
      const clientSecret = 'mock_client_secret_for_demo';
      
      // In a real app, you would confirm the payment with the client secret
      // const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: billingDetails,
      //   },
      //   setup_future_usage: 'off_session',
      // });

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate a successful payment 80% of the time
      const isSuccess = Math.random() < 0.8;
      
      if (isSuccess) {
        onSuccess({
          id: `pi_${Math.random().toString(36).substring(2, 10)}`,
          amount: cartTotal * 100,
          status: 'succeeded',
          created: Math.floor(Date.now() / 1000),
          payment_method: 'card_visa',
          billing_details: billingDetails,
          receipt_url: '#'
        });
      } else {
        // Simulate a payment failure
        throw new Error('Your card was declined. Please try another payment method.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred while processing your payment. Please try again.');
      onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBillingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Contact information</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={billingDetails.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Payment method</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
                className="p-2 border rounded-md"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm mt-2">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className={`w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

// Main Checkout component
const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to cart if empty
    if (cart.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [cart, isSuccess, navigate]);

  const handlePaymentSuccess = (paymentIntent) => {
    // In a real app, you would send the order to your backend
    const orderData = {
      id: `order_${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
      items: cart,
      total: cartTotal,
      payment: paymentIntent,
      status: 'processing',
      shipping: {
        name: 'John Doe', // In a real app, this would come from the form
        address: {
          line1: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '94103',
          country: 'US',
        },
      },
    };

    // Save order to localStorage for demo purposes
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...orders, orderData]));
    
    // Clear cart and show success
    clearCart();
    setOrder(orderData);
    setIsSuccess(true);
    
    // Track purchase in analytics
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderData.id,
        value: orderData.total,
        currency: 'USD',
        tax: 0,
        shipping: 0,
        items: orderData.items.map(item => ({
          item_id: item.id,
          item_name: item.name,
          item_variant: item.variant,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // Error is already shown in the form
  };

  if (isSuccess && order) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Order confirmed!
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Thank you for your purchase. Your order #{order.id} has been received and is being processed.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              We've sent a confirmation email with order details and tracking information.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Continue Shopping
              </a>
              <a
                href={`/orders/${order.id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Order
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>
          
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="payment-heading" className="lg:col-span-7">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="payment-heading" className="text-lg font-medium text-gray-900">
                    Payment details
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm 
                      cart={cart} 
                      cartTotal={cartTotal} 
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                </div>
              </div>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <ul role="list" className="text-sm font-medium text-gray-900 divide-y divide-gray-200">
                {cart.map((product) => (
                  <li key={product.id} className="py-6 flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                      {product.variant && (
                        <p className="text-sm text-gray-500 mt-1">{product.variant}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">Qty {product.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tax</dt>
                  <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  By placing this order, you agree to our{' '}
                  <a href="/terms" className="text-primary-600 hover:text-primary-800">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-primary-600 hover:text-primary-800">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
