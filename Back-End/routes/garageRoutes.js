const express = require('express');
const garageController = require('../controllers/garageController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', garageController.getAllGarages);

// Protected routes
router.use(authController.protect);

// Routes only for garage owners
router.use(authController.restrictTo('Owner'));
router.delete('/:id', garageController.deleteGarage);

module.exports = router;
