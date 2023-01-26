import { AuthService } from './auth.service';

export function initializeApp(authService: AuthService) {
  return () => authService.restoreSession();
}
