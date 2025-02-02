import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'inscription à la newsletter
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          {/* À propos */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-3">
              <img
                src="/logo.png"
                alt="Les Repas Lili"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 text-xs">
              Connecter les restaurants et les associations pour lutter contre le gaspillage alimentaire.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Navigation
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-xs">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-xs">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-400 hover:text-white text-xs">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-xs">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Légal
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white text-xs">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-gray-400 hover:text-white text-xs">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-gray-400 hover:text-white text-xs">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Newsletter
            </h3>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Adresse email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 px-2 py-1 text-xs text-gray-900 placeholder-gray-500 border border-transparent rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Votre email"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-3 py-1 text-xs font-medium text-white bg-blue-500 border border-transparent rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Réseaux sociaux et copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-gray-400 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Les Repas Lili. Tous droits réservés.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 