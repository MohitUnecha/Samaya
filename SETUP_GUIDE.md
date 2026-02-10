# Samaya Global - Setup & Deployment Guide

## Quick Start

### Development Mode

#### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

#### Terminal 2 - Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

Visit http://localhost:3000 in your browser to see the site.

## Email Configuration (Required for Contact Form)

The contact form requires Gmail SMTP configuration:

### Step 1: Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and your device type
3. Google will generate a 16-character password
4. Copy this password

### Step 3: Configure Backend
In `/backend/.env`:
```env
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # The 16-char password
RECIPIENT_EMAIL=where_to_send_inquiries@gmail.com
```

## Production Deployment

### Frontend Deployment (GitHub Pages)

1. **Update Next.js Config**
   
   In `frontend/next.config.ts`:
   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     basePath: '', // Change if using subdirectory
     images: {
       unoptimized: true,
     },
   };
   export default nextConfig;
   ```

2. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Point to `gh-pages` branch (auto-deployed via GitHub Actions)

4. **Update Frontend Environment**
   
   In `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://samaya-backend.vercel.app
   ```

### Backend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   cd backend
   npm i -g vercel
   vercel deploy
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - `PORT`: 3001
   - `FRONTEND_ORIGIN`: https://samayaglobal.com
   - `EMAIL_USER`: your_gmail@gmail.com
   - `EMAIL_PASSWORD`: xxxx xxxx xxxx xxxx
   - `RECIPIENT_EMAIL`: samaya_contact@gmail.com

4. **Get Backend URL**
   - Vercel will provide a URL like: `https://samaya-backend.vercel.app`
   - Update frontend `.env.local` with this URL

## Environment Variables Summary

### Frontend (.env.local)
```env
# API endpoint for contact form
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001  # Dev
NEXT_PUBLIC_API_BASE_URL=https://samaya-backend.vercel.app  # Prod
```

### Backend (.env)
```env
# Server
PORT=3001
NODE_ENV=development  # or production

# CORS
FRONTEND_ORIGIN=http://localhost:3000  # Dev
FRONTEND_ORIGIN=https://samayaglobal.com  # Prod

# Email (Gmail SMTP)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # App password (16 chars)
RECIPIENT_EMAIL=samaya_contact@gmail.com
```

## Troubleshooting

### Contact Form Not Working

**Problem**: Form submission fails or emails not sending

**Solutions**:
1. Check Gmail app password is correct (16 characters, spaces included)
2. Verify 2FA is enabled on Gmail account
3. Check backend logs: `npm run dev` in backend directory
4. Verify `FRONTEND_ORIGIN` matches your frontend URL
5. Test with: `curl -X POST http://localhost:3001/api/health`

### Backend Deployment Issues

**Problem**: Vercel deployment fails

**Solutions**:
1. Ensure `src/index.js` exists and exports app
2. Check `vercel.json` configuration
3. Verify all environment variables are set
4. Check Vercel logs: `vercel logs`

### Frontend Build Issues

**Problem**: Next.js build fails

**Solutions**:
1. Clear cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npx tsc --noEmit`
4. Verify all imports are correct

## Testing

### Test Contact Form (Local)
1. Start both frontend and backend
2. Go to http://localhost:3000/contact
3. Fill in the form with test data
4. Submit and check:
   - Success message appears
   - Email received in `RECIPIENT_EMAIL`
   - Confirmation email sent to your test email

### Test Dark Mode
1. Click sun/moon icon in header
2. Preference should persist on refresh (localStorage)

### Test Responsive Design
1. Open DevTools (F12)
2. Test at various breakpoints:
   - Mobile: 375px, 768px
   - Tablet: 768px, 1024px
   - Desktop: 1920px

## Monitoring & Maintenance

### Monitor Email Sending
- Check Gmail inbox for delivery notifications
- Monitor backend logs for errors
- Set up Vercel alerts for failed requests

### Performance Monitoring
- Use Lighthouse (DevTools) to check performance
- Monitor Vercel analytics dashboard
- Check Core Web Vitals

### Regular Maintenance
- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Review and optimize images
- Monitor error logs

## Custom Domain Setup

### Using Custom Domain (samayaglobal.com)

**Option 1: Via GitHub Pages**
1. Add `CNAME` file in `/frontend/public/CNAME`:
   ```
   samayaglobal.com
   ```
2. Configure DNS:
   - Point A records to GitHub Pages IP
   - Or use CNAME to point to GitHub Pages

**Option 2: Via Vercel**
1. Add custom domain in Vercel dashboard
2. Update DNS with Vercel nameservers or CNAME

### Update Configuration
Once domain is set up:
- Frontend: `https://samayaglobal.com`
- Backend: `https://api.samayaglobal.com` (optional subdomain)

Update environment variables accordingly.

## Backup & Security

### Important Files to Backup
- `frontend/.env.local` (contains API endpoints)
- `backend/.env` (contains sensitive credentials)
- Database connection strings (if added later)

### Security Best Practices
1. **Never commit `.env` files** - Use `.gitignore`
2. **Rotate email passwords** - Change app passwords periodically
3. **Monitor CORS** - Only allow your frontend origin
4. **Rate limiting** - Already configured in backend
5. **HTTPS only** - Always use HTTPS in production

## Version Control

### Git Workflow
```bash
# Clone repository
git clone https://github.com/yourusername/samaya-global.git
cd samaya-global

# Create feature branch
git checkout -b feature/new-feature

# Make changes, commit
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Commit Messages
- Use clear, descriptive messages
- Format: `type(scope): description`
- Examples:
  - `feat(contact): add email validation`
  - `fix(events): correct date display`
  - `docs(readme): update setup instructions`

## Support & Help

### Common Issues
- See "Troubleshooting" section above
- Check backend console for error logs
- Check browser console (DevTools) for frontend errors

### Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Nodemailer Guide](https://nodemailer.com/)

---

**Last Updated**: February 5, 2026  
**Version**: 1.0.0
