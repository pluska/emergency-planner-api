export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
} 