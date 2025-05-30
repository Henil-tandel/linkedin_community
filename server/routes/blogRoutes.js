const express = require('express');
const router = express.Router();
const { saveDraft, publishBlog, getBlogs, getBlogById, updateBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.post('/save-draft', protect, saveDraft);
router.post('/publish', protect, publishBlog);
router.get('/', protect, getBlogs);
router.get('/:id', protect, getBlogById);
router.put('/:id', protect, updateBlog);

module.exports = router;
