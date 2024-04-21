const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const memoController = require('../controller/memo.controller');

// Read
router.get('/', memoController.getMemos);

// Create
router.get('/add', memoController.getAddMemoForm);
router.post('/', upload.single('image'), memoController.createMemo);

// Edit
router.get('/edit/:id', memoController.getEditMemoForm);

// Update
router.post('/edit/:id', upload.single('image'), memoController.updateMemo);

// Delete
router.delete('/delete/:id', memoController.deleteMemo);

module.exports = router;
