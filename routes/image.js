// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const imageController = require('../controller/image.controller');

// router.put('/:id/image', upload.single('image'), imageController.updateMemoImage);

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controller/image.controller');
const prisma = require('../prisma');

const upload = multer({ dest: 'uploads/' });

router.post('/:id/image', upload.single('image'), (req, res) => {
    imageController.updateMemoImage(req, res, prisma);
});

module.exports = router;