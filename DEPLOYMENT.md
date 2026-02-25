# Deployment Guide for Vercel

## Quick Deploy

1. **Install Vercel CLI** (optional, or use GitHub integration):
   ```bash
   npm i -g vercel
   ```

2. **Build the project locally to test**:
   ```bash
   npm run build
   npm run preview
   ```
   This will build and serve the app locally. Check that everything works.

3. **Deploy to Vercel**:
   
   **Option A: Using Vercel CLI**
   ```bash
   vercel
   ```
   Follow the prompts. For production:
   ```bash
   vercel --prod
   ```

   **Option B: Using GitHub Integration**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Vite and configure it

## Vercel Configuration

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing rewrites (all routes → index.html)
- Service worker headers
- Asset caching headers

## Troubleshooting 404 Errors

If you see 404 errors for JavaScript files:

1. **Check build output**:
   ```bash
   npm run build
   ls -la dist/
   ```
   You should see `index.html` and an `assets/` folder with JS files.

2. **Verify vercel.json exists** and has correct `outputDirectory`:
   ```json
   {
     "outputDirectory": "dist"
   }
   ```

3. **Check Vercel build logs**:
   - Go to your Vercel project dashboard
   - Click on the latest deployment
   - Check the "Build Logs" tab
   - Ensure build completed successfully

4. **Clear Vercel cache**:
   - In Vercel dashboard → Settings → General
   - Click "Clear Build Cache"
   - Redeploy

5. **Verify file paths**:
   - The built `index.html` should reference files like `/assets/index-xxxxx.js`
   - If paths are wrong, check `vite.config.js` base path

## Environment Variables

If you need Firebase config in production:

1. Go to Vercel project → Settings → Environment Variables
2. Add your Firebase config as environment variables
3. Update `src/config/firebase.js` to read from `import.meta.env`

Example:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ...
};
```

## Service Worker

The service worker (`sw.js`) is configured to:
- Cache assets for offline use
- Handle push notifications (when FCM is set up)
- Work with Vercel's routing

If service worker issues occur:
- Check browser console for errors
- Verify `/sw.js` is accessible
- Check `vercel.json` headers for service worker

## Testing Production Build Locally

Before deploying, test the production build:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` and verify:
- All pages load correctly
- Navigation works
- Assets load (check Network tab)
- No console errors

## Common Issues

### Issue: 404 for assets
**Solution**: Ensure `vercel.json` has correct `outputDirectory: "dist"`

### Issue: Routes return 404
**Solution**: The `rewrites` in `vercel.json` should handle this. Verify it's present.

### Issue: Service worker not registering
**Solution**: Check that `sw.js` is in the `public/` folder and `vercel.json` has correct headers.

### Issue: Build fails
**Solution**: 
- Check Node.js version (Vercel uses Node 18+ by default)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors
