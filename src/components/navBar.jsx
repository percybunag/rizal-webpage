import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = {
    Home: null,
    About: ['Introduction', 'Biography', 'Political Thought', 'Legacy'],
    Works: ['Literary Works', 'Quotes'],
    Timeline: null,
    Gallery: ['Illustrations & Photos', 'Interviews'],
    Interactive: ['Quizzes', 'Puzzles'],
    References: null,
    Contact: null
  };

  const handleMouseEnter = (item) => {
    setActiveDropdown(item);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleClick = (e, item) => {
    if (menuItems[item]) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === item ? null : item);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = ({ isMobile = false }) => (
    <ul className={`${isMobile ? 'flex flex-col space-y-6' : 'hidden md:flex space-x-10'}`}>
      {Object.entries(menuItems).map(([item, submenu]) => (
        <li 
          key={item}
          className="relative"
          onMouseEnter={() => !isMobile && handleMouseEnter(item)}
          onMouseLeave={() => !isMobile && handleMouseLeave()}
        >
          <motion.a 
            href={`#${item.toLowerCase()}`}
            onClick={(e) => handleClick(e, item)}
            className={`inline-flex items-center text-sm tracking-wide transition-colors duration-200 ${
              activeDropdown === item 
                ? 'text-black' 
                : 'text-gray-500 hover:text-black'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {item}
            {submenu && (
              <motion.svg 
                className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-200`}
                animate={{ rotate: activeDropdown === item ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </motion.svg>
            )}
          </motion.a>
          
          <AnimatePresence>
            {submenu && activeDropdown === item && (
              <motion.ul 
                className={`${
                  isMobile 
                    ? 'pl-4 mt-2 space-y-3' 
                    : 'absolute left-0 mt-2 w-48 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg ring-1 ring-black/5'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {submenu.map((subItem) => (
                  <motion.li 
                    key={subItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.a
                      href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`block px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors duration-200 ${
                        isMobile ? 'border-l border-gray-100' : ''
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {subItem}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img className="h-7 w-auto" src="/logo.png" alt="Logo" />
            </motion.div>
            
            {/* Desktop Navigation */}
            <NavLinks />

            {/* Mobile menu button */}
            <motion.div 
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="sr-only">Open main menu</span>
                <AnimatePresence mode="wait">
                  {!isMobileMenuOpen ? (
                    <motion.svg
                      key="hamburger"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="close"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile side navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMobileMenu}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-white/80 backdrop-blur-sm border-l border-gray-100 z-50 md:hidden"
            >
              <div className="pt-5 pb-4 px-4">
                <div className="flex items-center justify-between">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img className="h-7 w-auto" src="/logo.png" alt="Logo" />
                  </motion.div>
                  <motion.button
                    onClick={toggleMobileMenu}
                    className="rounded-lg text-gray-500 hover:text-black hover:bg-gray-50 transition-colors duration-200 p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <div className="mt-8">
                  <NavLinks isMobile={true} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
