const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protected routes - needs authentication
// router.use(authController.protect);

// Restrict access based on role
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);

// Only Owners can create/delete admins
router.use(authController.restrictTo('Owner'));
router.post('/', adminController.createAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
