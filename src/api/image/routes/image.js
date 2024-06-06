const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/image');
const prisma = require('../../../../prisma');

const upload = multer({ dest: 'uploads/' });

router.post('/:id/image', upload.single('image'), (req, res) => {
    imageController.updateMemoImage(req, res, prisma);
});

module.exports = router;