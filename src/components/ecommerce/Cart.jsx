import { Fragment, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../lib/cartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartItemCount 
  } = useCart();
  
  const completeButtonRef = useRef(null);

  // Track cart view in analytics
  useEffect(() => {
    if (isCartOpen && window.gtag) {
      window.gtag('event', 'view_cart', {
        currency: 'USD',
        value: cartTotal,
        items: cart.map(item => ({
          item_id: item.id,
          item_name: item.name,
          item_variant: item.variant,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
  }, [isCartOpen, cart, cartTotal]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10) || 1;
    updateQuantity(itemId, quantity);
    
    // Analytics event for cart modifications
    if (window.gtag) {
      const item = cart.find(i => i.id === itemId);
      if (item) {
        window.gtag('event', 'update_cart', {
          currency: 'USD',
          value: item.price * quantity,
          items: [{
            item_id: item.id,
            item_name: item.name,
            item_variant: item.variant,
            quantity: quantity,
            price: item.price
          }]
        });
      }
    }
  };

  const handleRemoveItem = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    removeFromCart(itemId);
    
    // Analytics event for removed items
    if (window.gtag && item) {
      window.gtag('event', 'remove_from_cart', {
        currency: 'USD',
        value: item.price * item.quantity,
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

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        initialFocus={completeButtonRef}
        onClose={() => setIsCartOpen(false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setIsCartOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      {cart.length === 0 ? (
                        <div className="text-center py-12">
                          <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Start adding some items to your cart to get started.
                          </p>
                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={() => setIsCartOpen(false)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((product) => (
                              <li key={product.id} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link 
                                          to={`/products/${product.id.split('-')[0]}`}
                                          onClick={() => setIsCartOpen(false)}
                                        >
                                          {product.name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                                    </div>
                                    {product.variant && (
                                      <p className="mt-1 text-sm text-gray-500">{product.variant}</p>
                                    )}
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center">
                                      <label htmlFor={`quantity-${product.id}`} className="mr-2 text-gray-700">
                                        Qty
                                      </label>
                                      <select
                                        id={`quantity-${product.id}`}
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                      >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                          <option key={num} value={num}>
                                            {num}
                                          </option>
                                        ))}
                                      </select>
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveItem(product.id)}
                                        className="font-medium text-primary-600 hover:text-primary-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cartTotal.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="text-primary-600 font-medium hover:text-primary-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
