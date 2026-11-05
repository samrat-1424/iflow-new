const processedIds = new Set();

export default {
  async afterCreate(event) {
    const { result } = event;
    
    // Prevent double sending for the same entry ID within a short timeframe
    if (processedIds.has(result.id)) {
      console.log('Duplicate afterCreate detected for entry', result.id, '- skipping email.');
      return;
    }
    
    processedIds.add(result.id);
    // Remove from set after 10 seconds
    setTimeout(() => processedIds.delete(result.id), 10000);

    console.log('--- 📧 Email Debug Start ---');
    console.log('New Query Created, attempting to send email for Entry ID:', result.id);

    try {
      // Use the modern Strapi service resolver for the email plugin
      const emailService = strapi.service('plugin::email.email');
      
      if (!emailService) {
        console.error('❌ ERROR: Email service not found. Is the email plugin provider installed?');
        return;
      }

      const emailBody = `
New Form Submission Received 🚀

Name: ${result.full_name || 'N/A'}
Email: ${result.email || 'N/A'}
Mobile: ${result.mobile || 'N/A'}
Details: ${result.subject || 'N/A'}
Message: ${result.message || 'N/A'}

---
Submission ID: ${result.id}
Time: ${new Date().toLocaleString()}
      `;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2e7d32; border-bottom: 2px solid #e8f5e9; padding-bottom: 10px;">New Form Submission Received 🚀</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${result.full_name || 'N/A'}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${result.email || 'N/A'}</p>
            <p style="margin: 10px 0;"><strong>Mobile:</strong> ${result.mobile || 'N/A'}</p>
            <p style="margin: 10px 0;"><strong>Details:</strong> ${result.subject || 'N/A'}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong> ${result.message || 'N/A'}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;"><strong>Submission ID:</strong> ${result.id}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;

      const recipient = process.env.NOTIFICATION_EMAIL || 'samrat.kumar@loantap.in';
      console.log('Sending email to:', recipient);

      await emailService.send({
        to: recipient,
        subject: `Demo Request: ${result.full_name || 'New Submission'}`,
        text: emailBody,
        html: htmlBody,
      });

      console.log(`✅ SUCCESS: Email sent successfully to ${recipient} for entry`, result.id);

    } catch (err) {
      console.error('❌ ERROR: Email sending failed for entry', result?.id);
      console.error('Reason:', err.message || err);
      if (err.stack) console.error(err.stack);
    }
    console.log('--- 📧 Email Debug End ---');
  },
};
