# Contact Form Setup with MailChannels + Cloudflare Pages

This guide explains the email setup for NeedSites contact form using MailChannels API.

## Why MailChannels?

Cloudflare Pages Functions cannot establish SMTP connections (no raw TCP). MailChannels provides a free HTTPS API for sending emails from Cloudflare Workers/Pages.

## Required Environment Variables

In your Cloudflare Pages dashboard → Settings → Environment Variables:

### Required Variables:
- `TO_EMAIL` = `email@needsites.com` (where emails are sent)
- `FROM_EMAIL` = `email@needsites.com` (sender address)
- `REPLY_TO` = `email@needsites.com` (optional)

## DNS Configuration

### SPF Record (Required)
Update your SPF record in Cloudflare DNS. Edit the TXT record at root `@`:

```
v=spf1 include:spf.mailchannels.net include:zoho.com ~all
```

**Important:** Merge this with your existing SPF record. Do not create multiple SPF records.

### DKIM/DMARC
Keep your existing DKIM and DMARC records as configured.

## How It Works:

1. User submits contact form
2. Form sends JSON to `/api/contact` (Cloudflare Pages Function)  
3. Function validates data and calls MailChannels HTTPS API
4. Email delivered to `TO_EMAIL`
5. User sees success confirmation

## Testing

Test in browser console:

```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: {'content-type':'application/json'},
  body: JSON.stringify({
    name:'Test User',
    email:'test@needsites.com', 
    subject:'Console Test',
    message:'Hello from test'
  })
}).then(r=>r.json()).then(console.log)
```

Expected: `{ ok: true, success: true }`

## Security Features:

- Input validation and HTML escaping
- CORS headers configured  
- Environment variable validation
- Error handling with user-friendly messages
- Method validation (POST only)

## Troubleshooting:

- Check Cloudflare Pages Functions logs
- Verify environment variables are set
- Test using console command above
- Check spam folder for emails
- Ensure SPF record includes MailChannels

## Cost:

- Cloudflare Pages Functions: Free (100K requests/month)
- MailChannels: Free for Cloudflare users
- **Total: $0/month**