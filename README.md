# Manmohit Kumar - Portfolio

A modern, responsive portfolio website built with Next.js 15, React 19, and TypeScript. Features a contact form with email integration, animated hero section, skills showcase, and project gallery.

## Features

- **Modern Design**: Clean, glassmorphic UI with smooth animations
- **Responsive**: Fully responsive across all devices
- **Contact Form**: Integrated with Supabase and email notifications (Gmail SMTP)
- **Email Previews**: Development mode with Ethereal test email preview
- **Type-Safe**: Built with TypeScript for reliability
- **Performance**: Optimized with Next.js 15 Turbopack and server components

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=your_email@gmail.com
```

### Build & Deploy

```bash
npm run build
npm start
```

For production deployment, configure your SMTP and Supabase credentials in your hosting platform's environment variables.

## Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Email**: Nodemailer with Gmail SMTP
- **Development**: Dev tool for testing emails with Ethereal

## License

Built by Manmohit Kumar. All rights reserved.
