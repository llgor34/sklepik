import { AuthService } from './services/auth.service';

export function initializeApp(authService: AuthService) {
  return () => authService.restoreSession();
}
