import express from 'express';
import authController from '../controllers/authController';
import invitationController from '../controllers/invitationController';

const router = express.Router();

// Public route to accept invitation (doesn't require authentication)
router.post('/accept/:token', invitationController.acceptInvitation);

// Protected routes - only authenticated users
router.use(authController.protect);

// Routes for invitation management (requires authentication)
router.post(
  '/sendAdmin',
  authController.restrictTo('Owner'),
  invitationController.createInvitationForAdmin,
);
router.post(
  '/sendUser',
  authController.restrictTo('Owner', 'Observer'),
  invitationController.createInvitationForUser,
);
router.get('/', invitationController.getInvitations);
// router.delete('/:id', invitationController.deleteInvitation);
router.get('/check/:token', invitationController.checkInvitation);

export default router;
