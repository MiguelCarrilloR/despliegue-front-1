import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn, Users, User, Info } from "lucide-react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleNav = () => {
    setNav(!nav);
    // Prevent scroll when mobile menu is open
    document.body.style.overflow = !nav ? 'hidden' : 'unset';
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setNav(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  const navItems = [
    { title: "Jugadoras", path: "/about-players", icon: User },
    { title: "Reclutadores", path: "/about-scouts", icon: Users },
    { title: "Nosotros", path: "/about", icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, className = "" }) => (
    <Link
      to={to}
      className={`relative group px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive(to)
          ? "text-green-600 bg-green-50"
          : "text-gray-600 hover:text-green-600 hover:bg-green-50"
      } ${className}`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
        isActive(to) ? "scale-x-100" : ""
      }`} />
    </Link>
  );

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-sm shadow-lg" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src="https://i.imgur.com/ShYtGlJ.png"
              alt="Logo Promesas a la Cancha"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </div>
              </NavLink>
            ))}
            <Link
              to="/login"
              className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors duration-300"
            >
              <LogIn className="w-4 h-4" />
              Ingresa
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={handleNav}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-300"
          >
            {nav ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          nav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleNav}
      >
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out ${
            nav ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="p-4">
              <img
                src="https://i.imgur.com/ShYtGlJ.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>
            <div className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                    isActive(item.path)
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                  }`}
                  onClick={handleNav}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors duration-300"
                onClick={handleNav}
              >
                <LogIn className="w-5 h-5" />
                Ingresa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;