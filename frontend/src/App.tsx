import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { createContext, useContext, useState, useEffect } from 'react';
import { authService, LoginResponse } from './services/auth';
import './App.css';

// Contexte d'authentification
type AuthContextType = {
  isAuthenticated: boolean;
  user: LoginResponse['user'] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Layout component
function Layout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold">Les Repas Lili</span>
              </Link>
            </div>
            <div className="flex items-center">
              {auth.isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => auth.logout()}
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Les Repas Lili</h1>
      <p className="text-lg text-gray-600">Bienvenue sur notre application</p>
    </div>
  );
}

function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await auth.login(email, password);
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Connexion</h2>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

function Dashboard() {
  const auth = useAuth();
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">Bienvenue {auth.user?.name}</p>
      <p>Votre email : {auth.user?.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
} 