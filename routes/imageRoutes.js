const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.put('/:id/image', upload.single('image'), (req, res) => {
    const memoId = req.params.id;
    let imagePath = null;
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }
    const query = 'UPDATE memos SET image = ? WHERE id = ?';
    db.query(query, [imagePath, memoId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Image updated' });
    });
});

module.exports = router;
