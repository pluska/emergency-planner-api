import express from 'express';
import cors from 'cors';
import swaggerSpec from './swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

app.use('/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/gemini', geminiRoutes);

export default app;