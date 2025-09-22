# Email Configuration for NeedSites

## Resend Integration

**Important Update**: MailChannels discontinued their free service for Cloudflare Workers/Pages on August 31, 2024. We now use Resend API, which provides excellent integration with Cloudflare and a generous free tier.

## Required Environment Variables

Set these in your Cloudflare Pages dashboard (Settings → Environment Variables):

- `RESEND_API_KEY` = Your Resend API key (from https://resend.com/api-keys)
- `TO_EMAIL` = `email@needsites.com` (where contact form emails are sent)
- `FROM_EMAIL` = `email@needsites.com` (sender address - must be verified in Resend)

## Resend Setup

### 1. Create Account
1. Sign up at https://resend.com
2. Free tier: 3,000 emails first month, then 100 emails/month
3. More than sufficient for contact forms

### 2. Verify Domain
1. In Resend dashboard → Domains
2. Add `needsites.com`
3. Add DNS records to Cloudflare (provided by Resend)
4. Wait for verification (usually instant)

### 3. Create API Key
1. Go to https://resend.com/api-keys
2. Create new API key
3. Copy and add to Cloudflare Pages environment variables

### 4. Environment Variables
In Cloudflare Pages → Settings → Environment Variables:
```
RESEND_API_KEY = re_xxxxxxxxxxxxx
TO_EMAIL = email@needsites.com  
FROM_EMAIL = email@needsites.com
```

## How It Works

1. User submits contact form
2. Form data sent to `/api/contact` (Cloudflare Pages Function)
3. Function validates data and sends email via Resend HTTPS API
4. Email delivered to `TO_EMAIL` address
5. User receives success confirmation

## Testing

Browser console test:

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

Expected response: `{ ok: true, success: true, message: "..." }`

## Security Features

- Input validation and sanitization
- HTML escaping for all user-supplied content
- CORS headers configured
- Environment variable validation
- Proper error handling with user-friendly messages

## Troubleshooting

- Verify `RESEND_API_KEY` is set in Cloudflare Pages environment variables
- Ensure `needsites.com` domain is verified in Resend
- Check Cloudflare Pages Functions logs for errors
- Test using browser console command above
- Check spam folder for received emails

## Cost

- Cloudflare Pages Functions: Free tier (100,000 requests/month)
- Resend: 100 emails/month free (after first month's 3,000)
- **Total cost: $0/month for typical usage**

## Migration from MailChannels

If upgrading from MailChannels:
1. Remove any `spf.mailchannels.net` from SPF records (no longer needed)
2. Set up Resend account and domain verification
3. Add `RESEND_API_KEY` environment variable
4. Deploy updated function code