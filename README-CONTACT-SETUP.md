# Contact Form Setup with Resend + Cloudflare Pages

This guide explains the email setup for NeedSites contact form using Resend API.

## Why Resend?

MailChannels discontinued their free service for Cloudflare Workers/Pages on August 31, 2024. Resend is now the recommended solution with excellent Cloudflare integration and generous free tier.

## Required Environment Variables

In your Cloudflare Pages dashboard → Settings → Environment Variables:

### Required Variables:
- `RESEND_API_KEY` = Your Resend API key (get from https://resend.com/api-keys)
- `TO_EMAIL` = `email@needsites.com` (where emails are sent)
- `FROM_EMAIL` = `email@needsites.com` (sender address - must be verified in Resend)

## Resend Setup Steps

### 1. Create Resend Account
1. Go to https://resend.com and sign up
2. Get 3,000 free emails for your first month
3. After that: 100 free emails/month (more than enough for contact forms)

### 2. Verify Your Domain
1. In Resend dashboard, go to Domains
2. Add `needsites.com` 
3. Add the required DNS records to Cloudflare
4. Wait for verification (usually instant)

### 3. Create API Key
1. Go to https://resend.com/api-keys
2. Create a new API key
3. Copy the key and add it to Cloudflare Pages environment variables

### 4. Set Environment Variables
In Cloudflare Pages → Settings → Environment Variables:
```
RESEND_API_KEY = re_xxxxxxxxxxxxx (your API key)
TO_EMAIL = email@needsites.com
FROM_EMAIL = email@needsites.com
```

## How It Works:

1. User submits contact form
2. Form sends JSON to `/api/contact` (Cloudflare Pages Function)  
3. Function validates data and calls Resend HTTPS API
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
- Verify environment variables are set correctly
- Ensure domain is verified in Resend
- Test using console command above
- Check spam folder for emails

## Resend Free Tier:

- **First month**: 3,000 emails free
- **After first month**: 100 emails/month free
- **Paid plans**: Start at $20/month for 50,000 emails
- **Perfect for contact forms**: 100 emails/month is plenty

## Cost:

- Cloudflare Pages Functions: Free (100K requests/month)
- Resend: Free (100 emails/month after first month)
- **Total: $0/month for typical contact form usage**