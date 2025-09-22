# Contact Form Setup with Cloudflare Pages + Zoho Mail

This guide will help you set up the contact form to work with your Zoho Mail account and Cloudflare Pages.

## Required Environment Variables

In your Cloudflare Pages dashboard, go to Settings > Environment Variables and add:

### Required Variables:
- `ZOHO_EMAIL`: Your Zoho email address (email@needsites.com)

### Email Service Options (choose one):

#### Option 1: Using Resend (Recommended - Free tier available)
- `RESEND_API_KEY`: Your Resend API key
- Sign up at https://resend.com/
- Verify your domain or use their test domain
- This service will send emails using your Zoho email as the sender

#### Option 2: Using EmailJS (Alternative)
- `EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `EMAILJS_TEMPLATE_ID`: Your EmailJS template ID  
- `EMAILJS_PUBLIC_KEY`: Your EmailJS public key
- Configure at https://www.emailjs.com/

#### Option 3: Direct SMTP (Advanced)
- `ZOHO_SMTP_PASSWORD`: App-specific password from Zoho
- `ZOHO_SMTP_HOST`: smtp.zoho.com
- `ZOHO_SMTP_PORT`: 587
- Requires additional SMTP library setup

## Setup Steps:

### 1. Cloudflare Pages Environment Variables
1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the required variables for your chosen email service

### 2. Zoho Mail Configuration
1. Log into your Zoho Mail account
2. Go to Security > App Passwords
3. Generate an app-specific password for SMTP (if using Option 3)
4. Use this password in your environment variables

### 3. Email Service Setup (Resend - Recommended)
1. Sign up at https://resend.com/
2. Verify your domain (needsites.com) or use their test domain
3. Create an API key
4. Add the API key to your Cloudflare environment variables

### 4. Testing
1. Deploy your changes to Cloudflare Pages
2. Test the contact form on your live site
3. Check that emails are received at email@needsites.com

## How It Works:

1. User fills out the contact form
2. Form data is sent to `/api/contact` (Cloudflare Pages Function)
3. The function validates the data and sends an email
4. Email is sent via your chosen service to email@needsites.com
5. User receives a success confirmation

## Security Features:

- CORS headers configured
- Input validation and sanitization
- Rate limiting (basic implementation)
- Email format validation
- Error handling with user-friendly messages

## Troubleshooting:

- Check Cloudflare Pages Functions logs for errors
- Verify environment variables are set correctly
- Test email service credentials separately
- Check spam folder for received emails
- Ensure domain is verified with your email service

## Email Template:

The contact form sends beautifully formatted HTML emails with:
- Contact details (name, email, inquiry type, subject)
- Full message content
- Timestamp and IP address for security
- Professional styling matching your brand

## Cost:

- Cloudflare Pages Functions: Free tier (100,000 requests/month)
- Resend: Free tier (100 emails/day)
- Zoho Mail: Free tier (5GB storage, custom domain)

Total cost: $0/month for typical usage!