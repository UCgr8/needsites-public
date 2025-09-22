export async function onRequestPost({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Validate required environment variables
    if (!env.TO_EMAIL) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          success: false,
          error: 'Server configuration error: TO_EMAIL not set' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    if (!env.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          success: false,
          error: 'Server configuration error: RESEND_API_KEY not set. Please contact admin.' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse and validate request body
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ 
          ok: false, 
          success: false,
          error: 'Missing required fields: name, email, subject, message' 
        }),
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
        JSON.stringify({ ok: false, success: false, error: 'Invalid email address' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Sanitize user input for HTML (basic escaping)
    const escapeHtml = (text) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Build email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #667eea;">${safeEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${safeSubject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; white-space: pre-wrap; line-height: 1.6;">
${safeMessage}
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
          </div>
        </div>
      </div>
    `;

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `NeedSites <${env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: [env.TO_EMAIL],
        reply_to: email || env.REPLY_TO || env.FROM_EMAIL,
        subject: subject?.trim() ? `[NeedSites Contact] ${subject.trim()}` : 'New contact form submission',
        text: `New contact submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: htmlContent,
      })
    });

    console.log('Resend API response status:', resendResponse.status);
    
    if (resendResponse.ok) {
      const responseData = await resendResponse.json();
      console.log('Email sent successfully:', responseData);
      
      return new Response(
        JSON.stringify({ 
          ok: true,
          success: true,
          message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    } else {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          ok: false,
          success: false,
          status: resendResponse.status,
          error: errorText || 'Failed to send email. Please try again later.'
        }),
        { 
          status: resendResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        ok: false,
        success: false,
        error: message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function onRequestOptions({ request }) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequest({ request }) {
  if (request.method !== 'POST' && request.method !== 'OPTIONS') {
    return new Response(
      JSON.stringify({ ok: false, error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}