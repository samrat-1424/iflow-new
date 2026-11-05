import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const smtpUser = process.env.SMTP_USER || 'info@iflow.co.in';
    const smtpPass = process.env.SMTP_PASS || 'tsozexvpvsgsxozw';

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const emailBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2e7d32; border-bottom: 2px solid #e8f5e9; padding-bottom: 10px;">New Form Submission Received 🚀</h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name || 'N/A'}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email || 'N/A'}</p>
          <p style="margin: 10px 0;"><strong>Mobile:</strong> ${data.mobile || 'N/A'}</p>
          <p style="margin: 10px 0;"><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p style="margin: 10px 0;"><strong>Product:</strong> ${data.product || 'N/A'}</p>
          <p style="margin: 10px 0;"><strong>Message:</strong> ${data.message || 'N/A'}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div> 
    `; 

    // 1. Send internal notification to the team
    await transporter.sendMail({
      from: smtpUser,
      to: `samratkumar1424@gmail.com,${smtpUser}`,
      subject: `Demo Request: ${data.name || 'New Submission'}`,
      html: emailBody,
    });

    // 2. Send confirmation email back to the submitter (only if email is provided)
    if (data.email) {
      const confirmationBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">iFlow Team</h1>
            <p style="color: #bbdefb; margin: 8px 0 0; font-size: 14px;">Intelligent Lending Workflow</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px 24px;">
            <h2 style="color: #1a73e8; margin-top: 0;">Thank you, ${data.name || 'there'}! 🎉</h2>
            <p style="font-size: 15px; color: #444;">
              We really appreciate you taking time to connect, and we wanted to let you know that your inquiry matters to us. Our team will be in touch with you very soon.
            </p>

            <!-- Summary Card -->
            <div style="background: #f8f9ff; border-left: 4px solid #1a73e8; border-radius: 4px; padding: 16px 20px; margin: 24px 0;">
              <h3 style="margin: 0 0 12px; color: #333; font-size: 15px;">📋 Your Submission Summary</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 5px 0; color: #666; width: 110px;">Name</td><td style="padding: 5px 0; font-weight: 600;">${data.name || 'N/A'}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Email</td><td style="padding: 5px 0; font-weight: 600;">${data.email || 'N/A'}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Mobile</td><td style="padding: 5px 0; font-weight: 600;">${data.mobile || 'N/A'}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Company</td><td style="padding: 5px 0; font-weight: 600;">${data.company || 'N/A'}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Product</td><td style="padding: 5px 0; font-weight: 600;">${data.product || 'N/A'}</td></tr>
                ${data.message ? `<tr><td style="padding: 5px 0; color: #666;">Message</td><td style="padding: 5px 0; font-weight: 600;">${data.message}</td></tr>` : ''}
              </table>
            </div>

            <p style="font-size: 15px; color: #444;">
              If you have any immediate questions, feel free to reach out to us at 
              <a href="mailto:info@iflow.co.in" style="color: #1a73e8; text-decoration: none;">info@iflow.co.in</a>.
            </p>

            <p style="font-size: 15px; color: #444;">
              We look forward to speaking with you!<br/>
              <strong>iFlow Team</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f1f3f4; padding: 16px 24px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0;">© ${new Date().getFullYear()} LoanTap Financial Technologies Pvt. Ltd. All rights reserved.</p>
            <p style="margin: 6px 0 0;">This is an automated confirmation. Please do not reply to this email.</p>
          </div>

        </div>
      `;

      await transporter.sendMail({
        from: `"iFLOW" <${smtpUser}>`,
        to: data.email,
        subject: `✅ Your Demo Request Has Been Received – iFlow`,
        html: confirmationBody,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
