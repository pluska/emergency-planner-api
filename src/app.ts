import express from 'express';
import cors from 'cors';
import swaggerSpec from './swagger';
import swaggerUi from 'swagger-ui-express';
import emergencyPlansRoutes from './routes/emergencyPlansRoutes';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});

// Configurar Swagger antes de las rutas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Emergency Planner API Documentation"
}));

// Importar rutas después
import authRoutes from './routes/authRoutes';
import planRoutes from './routes/planRoutes';
import geminiRoutes from './routes/gemini.routes';

app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/emergency-plans', emergencyPlansRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;