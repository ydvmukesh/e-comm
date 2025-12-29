'use client';

import AuthModal from './AuthModal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthModalManager() {
  const { isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();

  const modalTitles = {
    login: 'Welcome Back',
    signup: 'Create Account',
    'forgot-password': 'Reset Password',
    'reset-password': 'Create New Password',
  };

  return (
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      title={modalTitles[authModalView]}
    >
      {authModalView === 'login' && <LoginForm />}
      {authModalView === 'signup' && <SignupForm />}
      {authModalView === 'forgot-password' && <ForgotPasswordForm />}
    </AuthModal>
  );
}
