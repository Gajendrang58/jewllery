const { validationResult } = require('express-validator');
const { sendFormSubmissionEmail } = require('../utils/sendMail');

const formController = {
  getForm: (req, res) => {
    res.json({ 
      status: 'Form submission endpoint is active',
      instructions: 'Send a POST request with name, email, mobile, and optional message'
    });
  },

  submitForm: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, mobile, message, date } = req.body;

    const submission = {
      name,
      email,
      mobile,
      message: message || '',
      date: date || new Date().toISOString()
    };

    try {
      // Send email only (no DB, no file)
      const emailResult = await sendFormSubmissionEmail(submission);

      if (!emailResult.success) {
        console.error('Email failed to send:', emailResult.error);
        return res.status(500).json({
          success: false,
          error: 'Email sending failed. Please try again later.'
        });
      }

      res.status(201).json({ 
        success: true,
        message: 'Form submitted and email sent successfully',
        data: submission
      });

    } catch (err) {
      console.error('Error submitting form:', err);
      res.status(500).json({
        success: false,
        error: 'Server error during form submission'
      });
    }
  }
};

module.exports = formController;
