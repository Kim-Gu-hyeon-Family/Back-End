const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.updateMemoImage = (req, res) => {
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
};
