function notifyOwnerOfWaitlist({ name, email, mobile,date }) {
  return `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background-color: #f9fafb; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); color: #111827;">
      <h2 style="color: #1d4ed8; text-align: center;">🎉 New Waitlist Registration</h2>
      <p style="text-align: center; font-size: 16px; color: #4b5563;">
        A new user has joined the waitlist to invest in luxury yachts through tokenized ownership.
      </p>
      
      <div style="margin-top: 24px;">
        <p><strong style="color: #374151;">Full Name:</strong> ${name}</p>
        <p><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #1d4ed8;">${email}</a></p>
        <p><strong style="color: #374151;">Mobile:</strong> <a href="tel:${mobile}" style="color: #1d4ed8;">${mobile}</a></p>
      </div>
 
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
 
      <p><strong style="color: #4b5563;">Submitted At:</strong> ${date}</p>
 
      <p style="margin-top: 32px; text-align: center; font-size: 14px; color: #6b7280;">
        🚢 Jewllery Team
      </p>
    </div>
  `;
}
 
module.exports = notifyOwnerOfWaitlist;