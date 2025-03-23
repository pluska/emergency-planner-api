import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserCredentials, AuthResponse, JWTPayload } from '../types/auth';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async validateUser(credentials: UserCredentials): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });
    
    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
    
    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h'
    });
  }

  async register(credentials: UserCredentials): Promise<AuthResponse> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { email: credentials.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    // Crear nuevo usuario
    const user = this.userRepository.create({
      email: credentials.email,
      password: hashedPassword
    });

    // Guardar usuario
    await this.userRepository.save(user);

    // Generar token
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    };
  }

  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const user = await this.validateUser(credentials);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    };
  }
} 