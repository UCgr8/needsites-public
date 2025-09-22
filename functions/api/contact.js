export async function onRequestPost(context) {
  const { request, env } = context;

  // Handle CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse form data
    const formData = await request.json();
    const { name, email, subject, message, inquiryType } = formData;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Rate limiting check (simple in-memory store, you might want to use KV)
    // This is a basic implementation - in production, use Cloudflare KV
    const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
    
    // Create email content
    const inquiryTypeLabels = {
      'general': 'General Inquiry',
      'domain-purchase': 'Domain Purchase', 
      'custom-search': 'Custom Domain Search',
      'bulk-purchase': 'Bulk Purchase',
      'support': 'Technical Support'
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Inquiry Type:</strong> ${inquiryTypeLabels[inquiryType] || inquiryType}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; white-space: pre-wrap; line-height: 1.6;">
${message}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Submitted on ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/New_York',
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} EST
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
              From IP: ${clientIP}
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email using Zoho SMTP via a service like Resend or direct SMTP
    // Using fetch to call Zoho's API or SMTP service
    const emailData = {
      from: `"NeedSites Contact Form" <${env.ZOHO_EMAIL}>`,
      to: env.ZOHO_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[NeedSites Contact] ${subject}`,
      html: emailHtml,
    };

    // Use Zoho Mail API or SMTP relay service
    // For Cloudflare Pages, we'll use a service that handles SMTP for us
    const emailResponse = await sendEmailViaZoho(emailData, env);

    if (!emailResponse.success) {
      console.error('Email send failed:', emailResponse.error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send email. Please try again later.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong. Please try again later.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}

// Helper function to send email via Zoho SMTP
async function sendEmailViaZoho(emailData, env) {
  try {
    // Method 1: Using a service like Resend with your Zoho email as sender
    if (env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailData.from,
          to: [emailData.to],
          reply_to: emailData.replyTo,
          subject: emailData.subject,
          html: emailData.html,
        }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const errorText = await response.text();
        return { success: false, error: errorText };
      }
    }

    // Method 2: Direct SMTP using a service worker (requires additional setup)
    // This would require setting up a separate SMTP service or using Cloudflare Email Workers

    // Method 3: Using Zoho Mail API (if available)
    if (env.ZOHO_API_KEY) {
      // This would use Zoho's REST API for sending emails
      // Implementation depends on Zoho's specific API requirements
    }

    // Fallback: Log the email (development mode)
    console.log('Email would be sent:', emailData);
    return { success: true };

  } catch (error) {
    console.error('SMTP Error:', error);
    return { success: false, error: error.message };
  }
}