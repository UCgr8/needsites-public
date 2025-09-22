# Email Configuration for NeedSites

## MailChannels Integration

Cloudflare Pages Functions cannot use SMTP connections. Instead, we send emails via the MailChannels HTTPS API, which is allowed on the Cloudflare Workers runtime.

## Required Environment Variables

Set these in your Cloudflare Pages dashboard (Settings → Environment Variables):

- `TO_EMAIL` = `email@needsites.com` (where contact form emails are sent)
- `FROM_EMAIL` = `email@needsites.com` (sender address)
- `REPLY_TO` = `email@needsites.com` (optional, defaults to user's email)

## DNS Configuration

### SPF Record

Update your existing SPF record in Cloudflare DNS. Edit the TXT record at root `@`:

```
v=spf1 include:spf.mailchannels.net include:zoho.com ~all
```

**Important:** Do not create multiple SPF records. Merge this into your existing SPF record if you have one.

### DKIM/DMARC

Keep your existing DKIM and DMARC records for `needsites.com` as currently configured.

## How It Works

1. User submits contact form
2. Form data is sent to `/api/contact` (Cloudflare Pages Function)
3. Function validates data and sends email via MailChannels HTTPS API
4. Email is delivered to `TO_EMAIL` address
5. User receives success confirmation

## Testing

You can test the contact form with this browser console command:

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

## Cost

- Cloudflare Pages Functions: Free tier (100,000 requests/month)
- MailChannels: Free for Cloudflare Workers/Pages users
- Total cost: $0/month for typical usage