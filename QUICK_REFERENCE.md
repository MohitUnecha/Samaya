# Quick Reference - Samaya Global Website

## 🚀 Start Development (5 seconds)

**Terminal 1 - Frontend:**
```bash
cd /Users/mohitunecha/SamayaGlobal/frontend && npm run dev
```

**Terminal 2 - Backend:**
```bash
cd /Users/mohitunecha/SamayaGlobal/backend && npm run dev
```

**Browser:** http://localhost:3000

---

## 📧 Configure Email (5 minutes)

1. **Get Gmail App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" → Device
   - Copy 16-character password

2. **Update `/backend/.env`**:
   ```env
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   RECIPIENT_EMAIL=admin@email.com
   ```

3. **Restart backend**: Press Ctrl+C, run `npm run dev` again

4. **Test**: Go to http://localhost:3000/contact and submit form

---

## 📁 Project Files

### Frontend Pages
- `/` - Home (landing page)
- `/events` - Events listing
- `/donate` - Donation options
- `/team` - Team members
- `/contact` - Contact form

### Key Files
```
frontend/
├── src/app/page.tsx              # Home page
├── src/app/events/page.tsx       # Events
├── src/app/donate/page.tsx       # Donations
├── src/app/team/page.tsx         # Team
├── src/app/contact/page.tsx      # Contact form
├── .env.local                    # Frontend config
└── package.json

backend/
├── src/index.js                  # Express server
├── .env                          # Email config
├── package.json
└── vercel.json                   # Deployment
```

---

## 🛠️ Common Tasks

### View in Browser
```bash
# Frontend already runs at http://localhost:3000
# Just open in your browser
```

### Edit a Page
```bash
# Edit the .tsx files in frontend/src/app/
# Changes auto-reload in browser
```

### Test Email
```bash
# 1. Configure .env with Gmail credentials
# 2. Go to http://localhost:3000/contact
# 3. Fill and submit form
# 4. Check email inbox
```

### Build for Production
```bash
cd frontend
npm run build
# Output in: ./out/
```

### Check for Errors
```bash
# Frontend console: DevTools (F12)
# Backend console: Look at Terminal 2
```

---

## 🎨 Theme Colors (Tailwind)

- **Primary**: `emerald-500` (green)
- **Dark BG**: `slate-950`
- **Light BG**: `slate-50`
- **Text Dark**: `slate-100`
- **Text Light**: `slate-900`

---

## 📱 Test Responsive Design

1. Open http://localhost:3000
2. Press F12 (DevTools)
3. Click phone icon (Toggle device)
4. Test at:
   - Mobile: 375px, 640px
   - Tablet: 768px, 1024px
   - Desktop: 1280px+

---

## 🚢 Deploy to Production

### Frontend (GitHub Pages)
```bash
cd frontend
npm run build
# Push to GitHub → auto-deploys
```

### Backend (Vercel)
```bash
cd backend
vercel deploy
# Set environment variables in Vercel dashboard
```

---

## 📞 Contact Information

**Team:**
- Samiksha Sharma - Founder
- Siddhi Dubey - Co-Founder  
- Mohit Unecha - Technology Strategist

**Note**: Chinmay has been removed from team page as requested.

---

## ⚡ Useful Links

- Frontend Docs: See `README.md`
- Setup Guide: See `SETUP_GUIDE.md`
- Project Summary: See `PROJECT_SUMMARY.md`
- Next.js Docs: https://nextjs.org/docs
- Express Docs: https://expressjs.com/

---

## 🔐 Environment Variables

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**Backend** (`.env`):
```env
PORT=3001
FRONTEND_ORIGIN=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
RECIPIENT_EMAIL=admin@gmail.com
```

---

## ✅ Checklist Before Going Live

- [ ] Gmail app password configured
- [ ] Contact form tested and working
- [ ] All pages load correctly
- [ ] Dark/Light mode toggle works
- [ ] Mobile design responsive
- [ ] No console errors (F12)
- [ ] Frontend builds without errors
- [ ] Backend deploys to Vercel
- [ ] Custom domain configured
- [ ] Email notifications working

---

**Last Updated**: February 5, 2026  
**Status**: Ready to Use ✅
