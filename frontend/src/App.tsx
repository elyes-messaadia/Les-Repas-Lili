import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LoginForm } from './components/auth/LoginForm';
import { RestaurantList } from './components/RestaurantList';
import { CreateRestaurantForm } from './components/restaurants/CreateRestaurantForm';
import { RestaurantDashboard } from './components/dashboard/RestaurantDashboard';
import { useAuth } from './contexts/AuthContext';
import './App.css';

// Composant protégé qui vérifie l'authentification
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <header className="App-header">
              <h1>Réservation de Restaurants</h1>
            </header>

            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<RestaurantList />} />
              <Route 
                path="/restaurants/new" 
                element={
                  <ProtectedRoute>
                    <CreateRestaurantForm />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App; 