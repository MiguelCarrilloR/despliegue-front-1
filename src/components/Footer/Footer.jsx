import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Github, 
  Mail, 
  MapPin, 
  Phone,
  ChevronRight,
  Heart
} from "lucide-react";

const FooterLink = ({ to, children }) => (
  <Link 
    to={to}
    className="flex items-center gap-2 text-gray-600 hover:text-green-600 hover:translate-x-1 transition-all duration-300"
  >
    <ChevronRight className="w-4 h-4" />
    <span>{children}</span>
  </Link>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-300 transform hover:scale-105"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

const Footer = () => {
  const navigation = {
    información: [
      { name: 'Jugadoras', to: '/about-players' },
      { name: 'Reclutadores', to: '/about-scouts' },
    ],
    cuenta: [
      { name: 'Iniciar sesión', to: '/login' },
      { name: 'Registrarse', to: '/register' },
    ],
    legal: [
      { name: 'Términos y condiciones', to: '/' },
      { name: 'Política de privacidad', to: '/' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61561095576509', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/promesasalacancha/', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/promesas_cancha', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/AdminPromesas', label: 'GitHub' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="https://i.imgur.com/anUuFBV.png"
                alt="Logo"
                className="h-10 w-auto"
              />
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Promesas a la Cancha
              </h1>
            </div>
            <p className="text-gray-600">
              Impulsando el talento futbolístico femenino con tecnología e innovación.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.label} {...social} />
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Información
            </h2>
            <ul className="space-y-3">
              {navigation.información.map((item) => (
                <li key={item.name}>
                  <FooterLink to={item.to}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Cuenta
            </h2>
            <ul className="space-y-3">
              {navigation.cuenta.map((item) => (
                <li key={item.name}>
                  <FooterLink to={item.to}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contáctanos
            </h2>
            <ul className="space-y-3">
              <li>
                <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                  <Mail className="w-4 h-4" />
                  <span>promesasalacancha@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Promesas a la Cancha. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;