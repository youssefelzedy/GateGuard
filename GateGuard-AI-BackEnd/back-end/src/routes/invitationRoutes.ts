import express from 'express';
import authController from '../controllers/authController';
import invitationController from '../controllers/invitationController';

const router = express.Router();

router.post('/accept/:token', invitationController.acceptInvitation);

router.use(authController.protect);

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
