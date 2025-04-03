const express = require('express');
const { adminOnly, protect } = require('../middlewares/authMiddleware');
const { dashboard } = require('../controllers/taskController')

const router = express.Router();


router.get('/dashboard-data', protect, dashboard);
router.get('/user-dashboard-data', protect, userDashboard);
router.get('/', protect, getTask);
router.get('/:id', protect, getTaskById);
router.post('/', protect, adminOnly,  createTask)

module.exports = router;