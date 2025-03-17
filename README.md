# Emergency Planner API

A modern API built with Express.js, TypeScript, Redis, and Swagger documentation.

## Prerequisites

- Node.js (v14 or higher)
- Redis server
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your configuration

## Development

Start the development server:
```bash
npm run dev
```

## Building

Build the project:
```bash
npm run build
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Linting

Run linter:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## Project Structure

```
src/
├── index.ts           # Application entry point
├── routes/           # API routes
├── controllers/      # Route controllers
├── services/         # Business logic
├── models/           # Data models
├── middleware/       # Custom middleware
└── test/            # Test files
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the TypeScript code
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues
- `npm run swagger`: Generate Swagger documentation 