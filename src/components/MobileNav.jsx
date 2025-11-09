import { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Info, Wrench, Phone, User, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navItems = [
    { 
      name: 'Home', 
      icon: <Home className="w-5 h-5" />, 
      href: '/',
      active: true
    },
    { 
      name: 'Services', 
      icon: <Wrench className="w-5 h-5" />,
      dropdown: [
        { name: 'Installation', href: '/services/installation' },
        { name: 'Maintenance', href: '/services/maintenance' },
        { name: 'Repair', href: '/services/repair' },
        { name: 'Inspection', href: '/services/inspection' },
      ]
    },
    { 
      name: 'About Us', 
      icon: <Info className="w-5 h-5" />,
      dropdown: [
        { name: 'Our Company', href: '/about' },
        { name: 'Our Team', href: '/about/team' },
        { name: 'Testimonials', href: '/testimonials' },
      ]
    },
    { 
      name: 'Contact', 
      icon: <Phone className="w-5 h-5" />, 
      href: '/contact' 
    },
  ];

  const accountItems = [
    { name: 'Profile', icon: <User className="w-5 h-5" />, href: '/profile' },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/settings' },
    { name: 'Help', icon: <HelpCircle className="w-5 h-5" />, href: '/help' },
    { name: 'Logout', icon: <LogOut className="w-5 h-5" />, href: '/logout' },
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none lg:hidden" ref={navRef}>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: isOpen ? 0 : -320 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-0 left-0 h-full w-80 max-w-[90vw] bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 pointer-events-auto overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  HVAC Pro
                </h2>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeDropdown === item.name 
                          ? 'bg-white/50 text-primary' 
                          : 'text-gray-700 hover:bg-white/50 hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1.5 rounded-lg ${
                          activeDropdown === item.name 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-gray-100/50 text-gray-500'
                        }`}>
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 ml-9 border-l-2 border-gray-100/50"
                        >
                          <div className="py-2 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block py-2 px-4 text-sm text-gray-600 hover:text-primary rounded-lg transition-colors"
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                      item.active 
                        ? 'bg-white/50 text-primary' 
                        : 'text-gray-700 hover:bg-white/50 hover:text-primary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`p-1.5 rounded-lg ${
                      item.active 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-gray-100/50 text-gray-500'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Divider */}
          <div className="px-4 my-4">
            <div className="h-px bg-gray-200/50"></div>
          </div>

          {/* Account Section */}
          <div className="p-4 space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Account
            </h3>
            {accountItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-white/50 hover:text-primary rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="p-1.5 rounded-lg bg-gray-100/50 text-gray-500">
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="p-4 mt-auto">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-4">Our team is available 24/7 for emergency services.</p>
              <a 
                href="tel:+1234567890" 
                className="block w-full text-center py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Menu Toggle Button - Changes to close button when menu is open */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 p-3 ${isOpen ? 'bg-white/80' : 'bg-white/80 backdrop-blur-md'} rounded-xl shadow-lg hover:shadow-xl transition-all pointer-events-auto lg:hidden`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </div>
  );
};

export default MobileNav;
