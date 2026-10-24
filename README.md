# Glamorous Imports — Premium Website Demo

A responsive React + Vite website concept for Glamorous Imports, Georgetown, Guyana. All portfolio images are illustrative inspiration images, not confirmed business projects. The service categories are proposed demo categories. The appointment and contact forms do not claim a booking is confirmed.

## Run locally
1. Install Node.js LTS (includes npm).
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL Vite prints, usually `http://localhost:5173`.

## Build for production
Run `npm run build`, then `npm run preview` to test the production build.

## Central business details
Edit `src/config/business.js` to update the phone, address, official social links, review link, canonical URL, and EmailJS configuration. The Instagram and Google Reviews links are intentionally unconfigured until verified.

## Images
Edit `src/data/portfolio.js` to change gallery images and labels. Hero and section image URLs are in `src/pages/Home.jsx`, `src/pages/About.jsx`, `src/pages/Services.jsx`, and `src/index.css`. The current Unsplash images are visual inspiration only. Replace them with licensed business-provided assets before launch.

## Appointment email integration
1. Create an EmailJS account and an email template.
2. Configure the template fields expected from the form (`name`, `email`, `phone`, `date`, `time`, `space`, `budget`, `contactMethod`, `message`, `subject`, `business_name`).
3. Add the service ID, template ID and public key in `src/config/business.js`.
4. Test submissions carefully. Never put private server credentials in frontend code.
Without EmailJS configuration, the form prepares a request in the current browser session and offers WhatsApp follow-up; it does not send an email.

## Real AI integration
The chatbot is explicitly a rule-based **Demo Assistant**, not connected to an AI model. For production, create a backend endpoint (for example `/api/chat`) that authenticates and rate-limits requests, keeps the provider API key server-side, and returns validated assistant messages. Replace `answer()` in `src/components/Chatbot.jsx` with a call to that endpoint. Never place a private AI API key in client-side JavaScript.

## Deployment
Deploy to Vercel, Netlify, or another static host:
- Build command: `npm run build`
- Output directory: `dist`
- For React Router direct links to `/about`, `/services`, `/portfolio`, `/appointment`, and `/contact`, configure SPA rewrites/fallback to `index.html`.
- Configure the final canonical domain in `src/config/business.js` and add production SEO metadata before launch.

## Verification / business accuracy
- The business phone, address, Facebook and TikTok URLs are based on the supplied brief.
- Rating is shown as 4.5/5 from 2 listed reviews, but actual review text is unavailable and is not fabricated.
- No business email, Instagram profile, confirmed service availability, prices, inventory, projects, awards, or appointment availability is invented.
- Google Maps uses an address search and does not invent coordinates.
