# AI Debate

This repository contains a fullstack application with:

- `backend/` — Express + MongoDB API
- `frontend/ai-debate-frontend/` — React frontend created with Create React App
- `netlify.toml` — Netlify build settings for the React app

## Deployment

### Frontend

The Netlify configuration in `netlify.toml` is set up to deploy only the React frontend from `frontend/ai-debate-frontend`.

Netlify will:

- use `frontend/ai-debate-frontend` as its base folder
- run `npm run build`
- publish the generated `build` folder
- rewrite all routes to `index.html` for client-side routing

### Backend

The backend is not deployed by Netlify in this repository. It must be hosted separately using a service like:

- Render
- Railway
- Fly.io
- DigitalOcean App Platform
- Heroku (if still available in your region)

Once the backend is hosted, set the frontend environment variable on Netlify to the backend URL.

Example frontend API variable:

- `REACT_APP_API=https://your-backend.example.com`

### Local development

For local frontend development, the frontend currently uses CRA proxy to forward API requests to `http://localhost:5000`.

If you want to access the app from a mobile device on the same network, run the frontend with:

```powershell
$env:REACT_APP_API='http://<YOUR_PC_IP>:5000'
$env:HOST='0.0.0.0'
npm start
```

Then open `http://<YOUR_PC_IP>:3000` on your phone.

### Important note

Netlify only serves the static frontend app. The API calls from the browser must point to a separately hosted backend service.
