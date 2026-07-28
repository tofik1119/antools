import { useState } from 'react';
import styles from './AuthModal.module.scss';

export default function AuthModal({
  mode,
  onAuthenticated,
  onClose,
  onSwitch,
}) {
  const [message, setMessage] = useState('');
  const isLogin = mode === 'login';
  const loginFooterMessage = "Don't have an account?";
  const registerFooterMessage = 'Already have an account?';

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email')).trim().toLowerCase();

    if (!isLogin && form.get('password') !== form.get('passwordConfirmation')) {
      setMessage('Passwords do not match.');
      return;
    }

    const savedAccount = localStorage.getItem('antools-account');

    if (isLogin && savedAccount !== email) {
      setMessage('Account not found. Please register first.');
      return;
    }

    localStorage.setItem('antools-account', email);
    onAuthenticated(email);
    setMessage(isLogin ? 'You are logged in.' : 'Account created.');
  }

  return (
    <div className="overlay" onMouseDown={onClose} role="presentation">
      <section
        className={`authorization authorization--is-open ${styles.dialog}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="authorization__close"
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>
        <div className="authorization__header">
          <h2 className="authorization__title" id="auth-title">
            {isLogin ? 'Login' : 'Sign up'}
          </h2>
          <p className="authorization__description">
            {isLogin
              ? 'Welcome back to Antools.'
              : 'Save tools you want to revisit.'}
          </p>
        </div>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="authorization__input input-form"
            placeholder="Enter your email..."
            autoComplete="email"
            required
          />
          <input
            name="password"
            type="password"
            className="authorization__input input-form"
            placeholder="Enter your password..."
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            minLength="6"
            required
          />
          {!isLogin && (
            <input
              name="passwordConfirmation"
              type="password"
              className="authorization__input input-form"
              placeholder="Confirm your password..."
              autoComplete="new-password"
              minLength="6"
              required
            />
          )}
          <button className="button authorization__submit" type="submit">
            {isLogin ? 'Login' : 'Create account'}
          </button>
        </form>
        {message && (
          <p className="authorization__message" role="status">
            {message}
          </p>
        )}
        <div className="authorization__footer">
          <p>
            {isLogin ? loginFooterMessage : registerFooterMessage}{' '}
            <button
              type="button"
              className="text--ascent authorization__switch"
              onClick={() => onSwitch(isLogin ? 'register' : 'login')}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
