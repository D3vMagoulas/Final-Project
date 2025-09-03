export const environment = {
  production: false,
  apiBase: 'http://localhost:8080',
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
  },
  storageKeys: { token: 'auth_token' },
};
