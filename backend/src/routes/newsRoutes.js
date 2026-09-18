const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllNews,
  getTopNews,
  getNewsById,
  getMyNews,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');

// ⚠️ Order matter করে — specific route আগে, dynamic (:id) route পরে
router.get('/', getAllNews);
router.get('/top', getTopNews);
router.get('/my-news', protect, getMyNews);
router.get('/:id', getNewsById);

router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;