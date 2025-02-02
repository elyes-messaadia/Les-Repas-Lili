import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';

export function Header() {
  const auth = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          {/* Logo et navigation principale */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <img
                  src="/logo-with-text.png"
                  alt="Les Repas Lili"
                  className="h-12 sm:h-14 w-auto"
                />
              </div>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex ml-8 lg:ml-12 space-x-4 lg:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                Accueil
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                À propos
              </Link>
              <Link to="/restaurants" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                Restaurants
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                Contact
              </Link>
            </nav>
          </div>

          {/* Boutons de droite */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {auth.isAuthenticated ? (
              <div className="flex items-center space-x-2 lg:space-x-4">
                {/* Menu selon le rôle */}
                {auth.user?.role === 'ADMIN' && (
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                    Administration
                  </Link>
                )}
                {auth.user?.role === 'RESTAURANT' && (
                  <Link to="/restaurant/dashboard" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                    Mon Restaurant
                  </Link>
                )}
                {auth.user?.role === 'ASSOCIATION' && (
                  <Link to="/association/dashboard" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                    Mon Association
                  </Link>
                )}
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50">
                  Dashboard
                </Link>
                <button
                  onClick={() => auth.logout()}
                  className="ml-2 bg-red-500 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50"
                >
                  Se connecter
                </Link>
                <Link
                  to="/contact"
                  className="bg-blue-500 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
                >
                  Devenir partenaire
                </Link>
              </div>
            )}
          </div>

          {/* Bouton menu mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {/* Icon menu */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-5 w-5`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon fermer */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-5 w-5`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200`}>
        <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
          <Link
            to="/"
            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            À propos
          </Link>
          <Link
            to="/restaurants"
            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Restaurants
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Contact
          </Link>
          
          {auth.isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Dashboard
              </Link>
              <button
                onClick={() => auth.logout()}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 rounded-md"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Se connecter
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50 rounded-md"
              >
                Devenir partenaire
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 