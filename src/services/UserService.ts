import { PrismaClient } from '.prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class UserService {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                id: uuidv4(),
                email,
                password: hashedPassword
            }
        });
    }

    async verifyPassword(email: string, password: string) {
        const user = await this.findByEmail(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }

    async updatePassword(userId: string, newPassword: string): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword }
            });
        } catch (error) {
            console.error('Error updating password:', error);
            throw new Error('Failed to update password');
        }
    }
} 