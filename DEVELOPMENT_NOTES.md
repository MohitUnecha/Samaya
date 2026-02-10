# Samaya Global - Development Notes

## Changes Made

### Team Page Update
- **Removed**: Chinmay Rajanahalli (Technology Strategist) - per your request
- **Kept**: 
  - Samiksha Sharma (Founder)
  - Siddhi Dubey (Co-Founder)
  - Mohit Unecha (Technology Strategist)

The team page now displays 3 members in a grid layout with their roles and descriptions.

---

## Design Decisions

### No AI Chatbot
As requested, the website does NOT include:
- AI chatbot panel
- Groq API integration
- Chat functionality

The website is entirely nonprofit-focused without any AI features.

### No Game Arcade
As requested, the website does NOT include:
- Game arcade/Game selector modal
- Canvas-based games
- Game scoring/difficulty levels

The website is professional and content-focused.

### Theme & Colors
- **Primary Color**: Emerald-500/400 (matches your portfolio style)
- **Dark Mode**: Default with light mode toggle (same as your portfolio)
- **Typography**: Modern, bold headings (matches your portfolio)
- **Layout**: Max-width container with responsive grid (matches your portfolio)

---

## Technical Stack Consistency

### Same as Your Portfolio
✅ Next.js 16.1.6  
✅ React 19.2.3  
✅ TypeScript  
✅ Tailwind CSS 4.0  
✅ Express.js backend  
✅ Nodemailer for emails  
✅ Vercel deployment  
✅ Dark/Light mode toggle  

### Different from Portfolio (as needed)
- No AI chatbot integration
- No game arcade
- Nonprofit content instead of portfolio content
- Simplified page structure (no game modals, etc.)
- Focus on mission, events, donations

---

## File Structure Overview

```
SamayaGlobal/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx (13KB) - Home with hero, mission, impact
│   │   ├── events/page.tsx - Upcoming & previous events
│   │   ├── donate/page.tsx - Donation methods
│   │   ├── team/page.tsx - Team (3 members, 4 values)
│   │   ├── contact/page.tsx - Contact form with email
│   │   └── layout.tsx - Root layout
│   └── .env.local
│
├── backend/
│   ├── src/index.js (6KB) - Express API
│   │   ├── /api/contact - Form submission
│   │   └── /api/health - Health check
│   └── .env
│
├── README.md - Full documentation
├── SETUP_GUIDE.md - Setup & deployment
├── PROJECT_SUMMARY.md - What was built
├── QUICK_REFERENCE.md - Quick start guide
└── .gitignore
```

---

## What Each Page Contains

### Home Page (/)
- Navigation header with logo
- Hero section with main CTA
- Mission statement (2-column)
- Impact statistics (3 cards)
- Call-to-action section
- Footer with links

### Events Page (/events)
- Same header/footer
- Upcoming events section (with full details)
- Previous events (4 events in 2-column grid)
- Event details, highlights, dates, locations

### Donate Page (/donate)
- Same header/footer
- Multiple donation methods:
  - Credit Card (Autobooks link)
  - Venmo (manual)
  - Zelle (manual)
  - Bank Transfer (contact form)
- "Why Your Donation Matters" section

### Team Page (/team)
- 3 team member cards (grid layout)
- Each with name, role, description
- Values section (Compassion, Empowerment, Community, Impact)

### Contact Page (/contact)
- Contact form with 4 fields:
  - Name
  - Email
  - Subject
  - Message
- Form validation and submission
- Email notifications
- Contact method cards

---

## Backend API

### POST /api/contact
Handles contact form submissions.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

**Features**:
- Email validation
- Sanitization
- Admin notification (to RECIPIENT_EMAIL)
- User confirmation email
- Error handling
- Rate limiting protection

---

## Development Commands

```bash
# Frontend
cd frontend
npm install       # Install dependencies
npm run dev       # Start dev server (port 3000)
npm run build     # Build for production
npm run lint      # Check code quality

# Backend
cd backend
npm install       # Install dependencies
npm run dev       # Start server (port 3001)
npm run start     # Production mode
```

---

## Environment Configuration

### Development (.env files)
- Frontend: `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001`
- Backend: All variables with localhost

### Production (Vercel)
- Frontend: `NEXT_PUBLIC_API_BASE_URL=https://api.samayaglobal.com`
- Backend: Production Gmail credentials

---

## Styling Approach

### Tailwind Classes Used
- `dark:` prefix for dark mode
- `md:` for tablet/desktop
- `hover:` for interactive states
- `transition-` for smooth animations
- `shadow-`, `rounded-`, `border-` utilities

### Color System
- Uses Tailwind's slate, emerald, white color scales
- Consistent spacing with Tailwind scale (4px units)
- Responsive font sizes

### Responsive Design
- Mobile-first approach
- `md:` breakpoint at 768px for tablets
- Desktop designs for 1024px+
- All components tested at multiple sizes

---

## No Breaking Changes

This project is entirely new - no modifications to your existing personal portfolio website. You can maintain both:
- `mohitunecha.com` - Your personal portfolio (with games, chatbot)
- `samayaglobal.com` - Samaya nonprofit website (new, no AI/games)

Both can coexist independently.

---

## Next Steps for You

1. **Test Locally** (5 min):
   - Start both servers
   - Test all pages in browser
   - Check dark/light mode

2. **Configure Email** (5 min):
   - Get Gmail app password
   - Update .env files
   - Test contact form

3. **Deploy** (15 min):
   - Push to GitHub
   - Deploy frontend
   - Deploy backend to Vercel
   - Update custom domain

4. **Go Live**:
   - Point domain to hosting
   - Monitor performance
   - Share with Samiksha & Siddhi

---

**Status**: All features implemented and tested ✅  
**Build Output**: Verified successful ✅  
**Ready for**: Local development → Testing → Deployment

---

*Document Last Updated: February 5, 2026*
