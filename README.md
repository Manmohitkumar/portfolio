# Manmohit Kumar - Portfolio

A modern, responsive portfolio website built with Next.js 15, React 19, and TypeScript. Features a contact form with email integration, animated hero section, skills showcase, and project gallery.

## Features

- **Modern Design**: Clean, glassmorphic UI with smooth animations
- **Responsive**: Fully responsive across all devices
- **Contact Form**: Email delivery via EmailJS
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
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
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
- **Email**: EmailJS (client-side)

## License

Built by Manmohit Kumar. All rights reserved.
