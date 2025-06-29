const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { validateForm } = require('../utils/validators/formValidator');
const handleValidation = require('../middlewares/handleValidation');
require('dotenv').config();
router.get('/', formController.getForm);
router.post('/', validateForm,handleValidation, formController.submitForm);

module.exports = router;