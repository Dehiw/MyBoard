# Kanban Board Deployment Guide

## 🚀 Running Without Localhost

### Option 1: Static File Server (Easiest)

1. **Build the application:**
   ```bash
   cd client
   npm run build
   ```

2. **Install serve globally:**
   ```bash
   npm install -g serve
   ```

3. **Serve the build:**
   ```bash
   serve -s build
   ```

4. **Access your app:** `http://localhost:3000`

### Option 2: Using Node.js Server

1. **Create a server file:**
   ```javascript
   // server-static.js
   const express = require('express');
   const path = require('path');
   const app = express();
   
   app.use(express.static(path.join(__dirname, 'client', 'build')));
   
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
   });
   
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

2. **Install express:**
   ```bash
   npm install express path
   ```

3. **Run the server:**
   ```bash
   node server-static.js
   ```

### Option 3: Using Python Server

1. **Navigate to build folder:**
   ```bash
   cd client/build
   ```

2. **Run Python server:**
   ```bash
   # Python 3
   python -m http.server 3000
   
   # Python 2
   python -m SimpleHTTPServer 3000
   ```

## 🔧 Configuration

### Backend URL Configuration

The app automatically detects the environment:

- **Development**: Uses `http://localhost:5000`
- **Production**: Uses `https://your-backend-url.com`

To use your own backend URL:

1. **Open `client/src/App.js`**
2. **Update line 5:**
   ```javascript
   const API_URL = 'https://your-actual-backend-url.com';
   ```

### Environment Variables

For production deployment:

1. **Create `.env` file in `client/`:**
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

2. **Update App.js to use environment variable:**
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

## 🌐 Deployment Options

### Netlify (Recommended)

1. **Push to GitHub**
2. **Connect Netlify to your GitHub repo**
3. **Set build command:** `npm run build`
4. **Set publish directory:** `client/build`
5. **Add environment variable:** `REACT_APP_API_URL`

### Vercel

1. **Install Vercel CLI:** `npm i -g vercel`
2. **Run:** `vercel --prod`
3. **Set environment variables in Vercel dashboard**

### GitHub Pages

1. **Update `package.json` homepage:**
   ```json
   "homepage": "https://yourusername.github.io/kanban-board"
   ```

2. **Build and deploy to `gh-pages` branch**

### Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY client/build ./build
   EXPOSE 3000
   CMD ["npx", "serve", "-s", "build"]
   ```

2. **Build and run:**
   ```bash
   docker build -t kanban-board .
   docker run -p 3000:3000 kanban-board
   ```

## 📝 Notes

- The frontend is now **static files** - no Node.js required for serving
- Backend still needs to be deployed separately
- Update `API_URL` to point to your deployed backend
- All time tracking and features work the same way

## 🔗 Backend Deployment

Don't forget to deploy your backend server separately! Options:
- **Heroku**, **Railway**, **Render**, **AWS**, **DigitalOcean**
- Make sure to enable CORS for your frontend domain
- Update MongoDB connection string for production
