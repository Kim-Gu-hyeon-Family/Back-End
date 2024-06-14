const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const memoController = require('../controllers/memo');

module.exports = (prisma) => {
    // Read
    router.get('/', (req, res) => memoController.getMemos(req, res, prisma));

    // Create
    router.get('/add', memoController.getAddMemoForm);
    router.post('/', upload.single('image'), (req, res) => memoController.createMemo(req, res, prisma));

    // Edit
    router.get('/edit/:id', (req, res) => memoController.getEditMemoForm(req, res, prisma));

    // Update
    router.put('/edit/:id', upload.single('image'), (req, res) => memoController.updateMemo(req, res, prisma));

    // Delete
    router.delete('/delete/:id', (req, res) => memoController.deleteMemo(req, res, prisma));

    return router;
};