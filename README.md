# Backend Peer Review API

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=8000
UPLOADS_DIR=./uploads
```

## Deployment to Vercel

1. Sign in to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `https://github.com/2400030969/backend-review-final-.git`
4. Vercel will automatically detect the `vercel.json` configuration
5. Deploy the project
6. Your API will be available at: `https://[PROJECT-NAME].vercel.app/api`

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:8000`

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create new assignment
- `GET /api/submissions` - Get submissions
- `POST /api/submit` - Submit project
- `GET /api/reviews` - Get reviews
- `POST /api/review` - Submit review

## CORS Configuration

The backend is configured with CORS enabled for all origins during development. For production, update the CORS settings in `server.js` to restrict to your frontend domain.