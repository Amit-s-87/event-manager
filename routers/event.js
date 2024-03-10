// eventRouter.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');

router.post('/events', eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);
router.post('/events/:id/register', eventController.registerEvent);

module.exports = router;
