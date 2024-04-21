const db = require('../db');

// Read
exports.getMemos = (req, res) => {
    const query = 'SELECT * FROM memos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('memoList', { title: 'Memos App', memos: results });
    });
};

// Create
exports.getAddMemoForm = (req, res) => {
    res.render('addMemo', { title: 'Add New Memo' });
};

exports.createMemo = (req, res) => {
    const { title, text } = req.body;
    let imagePath = null;
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }
    const query = 'INSERT INTO memos (title, text, image) VALUES (?, ?, ?)';
    db.query(query, [title, text, imagePath], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
};

// Edit
exports.getEditMemoForm = (req, res) => {
    const memoId = req.params.id;
    const query = 'SELECT * FROM memos WHERE id = ?';
    db.query(query, [memoId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('editMemo', { memo: result[0] });
        } else {
            return res.status(404).send('Memo not found');
        }
    });
};

// Update
exports.updateMemo = (req, res) => {
    const memoId = req.params.id;
    const { title, text } = req.body;
    let imagePath = req.body.imagePath;
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }
    const query = 'UPDATE memos SET title = ?, text = ?, image = ? WHERE id = ?';
    db.query(query, [title, text, imagePath, memoId], (err, result) => {
        if (err) throw err;
        res.redirect('/memos');
    });
};

// Delete
exports.deleteMemo = (req, res) => {
    const memoId = req.params.id;
    const query = 'DELETE FROM memos WHERE id = ?';
    db.query(query, [memoId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to delete memo');
        } else {
            res.sendStatus(204); // No Content
        }
    });
};
