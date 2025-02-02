import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Les Repas Lili
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {user.role === 'RESTAURANT' && (
                <Link
                  to="/restaurant-dashboard"
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  Tableau de bord
                </Link>
              )}
              {user.role === 'ASSOCIATION' && (
                <Link
                  to="/association-dashboard"
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  Tableau de bord
                </Link>
              )}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <span className="text-white">{user.firstName} {user.lastName}</span>
            <button
              onClick={handleLogout}
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Déconnexion
            </button>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {user.role === 'RESTAURANT' && (
            <Link
              to="/restaurant-dashboard"
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              Tableau de bord
            </Link>
          )}
          {user.role === 'ASSOCIATION' && (
            <Link
              to="/association-dashboard"
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              Tableau de bord
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
} 