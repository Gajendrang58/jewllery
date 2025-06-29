// utils/validators/formValidator.js
const { body } = require('express-validator');
const moment = require('moment');

const validateForm = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .matches(/^\+?[1-9]\d{9,14}$/).withMessage('Please enter a valid mobile number')
        .customSanitizer(value => value.replace(/\D/g, ''))  // Keep digits only
    ,
     body('date')
    .trim()
    .notEmpty().withMessage('Date is required')
    .custom((value) => {
      const isValid = moment(value, "DD/MM/YYYY [at] hh.mm A", true).isValid();
      if (!isValid) {
        throw new Error('Please enter a valid date');
      }
      return true;
    })
    .isLength({ max: 100 }).withMessage('Date string is too long'),


    body('message')
        .optional()
        .trim()
        .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters')

];

module.exports = {
    validateForm
};
