import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/auth';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('Token de réinitialisation manquant');
        return;
      }

      const isValid = await authService.validateResetToken(token);
      setIsValidToken(isValid);
      if (!isValid) {
        setError('Le lien de réinitialisation est invalide ou a expiré');
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await authService.resetPassword({
        token: token!,
        password,
        passwordConfirmation
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('Le lien de réinitialisation est invalide ou a expiré');
      } else {
        setError('Une erreur est survenue, veuillez réessayer plus tard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-red-50 text-red-500 p-4 rounded">
          Token de réinitialisation manquant
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-red-50 text-red-500 p-4 rounded">
          Le lien de réinitialisation est invalide ou a expiré
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-green-50 text-green-600 p-4 rounded">
          Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Réinitialisation du mot de passe</h2>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            minLength={8}
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            minLength={8}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
        </button>
      </form>
    </div>
  );
} 