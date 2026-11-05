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
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 24px; border-radius: 12px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #f3e8ff; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #623f99; margin: 0; font-size: 20px;">📑 New Case Study Accessed</h2>
          <p style="color: #6b7280; margin: 4px 0 0; font-size: 13px;">Someone unlocked case study content on the iFLOW website</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; width: 130px; font-weight: 500;">Name</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 600;">${data.name || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Email</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 600;"><a href="mailto:${data.email}" style="color: #623f99; text-decoration: none;">${data.email || 'N/A'}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Company</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 600;">${data.company || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Case Study</td>
            <td style="padding: 10px 0; color: #623f99; font-weight: 600;">${data.caseStudyTitle || data.caseStudySlug || 'General Case Studies'}</td>
          </tr>
        </table>
        
        <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; display: flex; justify-content: space-between;">
          <span>Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
        </div>
      </div>
    `;

    // Send notification email ONLY to samratkumar1424@gmail.com and info@iflow.co.in
    // (Submitter does NOT receive any email)
    await transporter.sendMail({
      from: `"iFLOW Case Studies" <${smtpUser}>`,
      to: `samratkumar1424@gmail.com,${smtpUser}`,
      subject: `Case Study Access: ${data.name || 'New Lead'} (${data.company || 'N/A'})`,
      html: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending case study access notification email:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
