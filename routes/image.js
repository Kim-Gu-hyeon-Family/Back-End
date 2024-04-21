const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const imageController = require('../controller/image.controller');

router.put('/:id/image', upload.single('image'), imageController.updateMemoImage);

module.exports = router;
