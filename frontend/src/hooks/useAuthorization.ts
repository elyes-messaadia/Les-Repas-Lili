import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/models';

export const useAuthorization = () => {
  const { user } = useAuth();

  const hasRole = (role: UserRole) => {
    return user?.roles.includes(role) ?? false;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    return roles.some(role => hasRole(role));
  };

  const isAdmin = () => hasRole('admin');
  const isRestaurateur = () => hasRole('restaurateur');
  const isAssociation = () => hasRole('association');
  const isBeneficiaire = () => hasRole('beneficiaire');
  const isBookingAgent = () => hasRole('booking_agent');

  return {
    hasRole,
    hasAnyRole,
    isAdmin,
    isRestaurateur,
    isAssociation,
    isBeneficiaire,
    isBookingAgent
  };
}; 