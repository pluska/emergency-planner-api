export const config = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173/emergency-planner',
    email: {
        user: process.env.EMAIL_USER || '',
        password: process.env.EMAIL_PASSWORD || ''
    }
}; 