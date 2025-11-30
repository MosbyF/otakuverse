'use client';
import { useFirebase } from '@/firebase/provider';

// Return type for useUser() - specific to user auth state
export interface UserHookResult {
  user: any | null; // Note: You might want to use the actual User type from 'firebase/auth'
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError } = useFirebase(); // Leverages the main provider hook
  return { user, isUserLoading, userError };
};
