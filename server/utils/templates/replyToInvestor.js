function replyToInvestor({ name }) {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background-color: #f9fafb; padding: 24px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); color: #111827;">
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">
        Dear <strong>${name}</strong>,
        <br /><br />
        Thank you for joining the Jewllery! We're thrilled to welcome you aboard as you explore investment opportunities for 3 and 5-year horizons.
        <br /><br />
        You’ll receive exclusive insights, tailored strategies, and early access to prime opportunities in the luxury yacht investment space.
        <br /><br />
        👉 <a href="" style="color: #1d4ed8; text-decoration: underline;">Visit Jewllery</a> to learn more.
        <br /><br />
        We’re excited to help you navigate your wealth-building journey!
      </p>
      <div style="margin-top: 32px; text-align: center; font-size: 14px; color: #6b7280;">
        Warm regards,<br/>
        <strong>The Jewllery Team</strong><br/>
        <a href="" style="color: #1d4ed8;">Jewllery</a><br/>
        <a href="" style="color: #1d4ed8;">@Jewllery on X</a>
      </div>
    </div>
  `;
}

module.exports = replyToInvestor;
