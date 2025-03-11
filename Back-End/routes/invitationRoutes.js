const express = require('express');
const invitationController = require('../controllers/invitationController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route to accept invitation (doesn't require authentication)
router.post('/accept/:token', invitationController.acceptInvitation);

// Protected routes - only authenticated users
router.use(authController.protect);
router.use(authController.restrictTo('Owner'));

// Routes for invitation management (requires authentication)
router.post('/send', invitationController.createInvitation);
router.get('/', invitationController.getInvitations);
router.delete('/:id', invitationController.deleteInvitation);

module.exports = router;
