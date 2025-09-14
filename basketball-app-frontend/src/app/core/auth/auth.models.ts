export interface AuthRequest {
  username: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
}

export interface SignupRequest {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}
