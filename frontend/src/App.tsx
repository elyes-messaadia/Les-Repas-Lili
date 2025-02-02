import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Login } from './components/Login';
import { ResetPassword } from './components/ResetPassword';
import { ContactForm } from './components/ContactForm';
import { ContactRequestList } from './components/admin/ContactRequestList';
import { Home } from './components/Home';

// Types pour l'authentification
type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'RESTAURANT' | 'ASSOCIATION';
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Création du contexte d'authentification
export const AuthContext = createContext<AuthContextType | null>(null);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: Implémenter la logique de connexion
    setUser({
      id: '1',
      email: email,
      role: 'ADMIN'
    });
  };

  const logout = async () => {
    // TODO: Implémenter la logique de déconnexion
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      login,
      logout
    }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/admin/contact-requests" element={<ContactRequestList />} />
          </Routes>
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App; 