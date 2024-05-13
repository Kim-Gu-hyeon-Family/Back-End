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
    // 새로운 메모의 ID를 결정하기 위해 현재 최대 ID 값을 찾습니다.
    const findMaxIdQuery = 'SELECT MAX(id) AS maxId FROM memos';
    db.query(findMaxIdQuery, (err, result) => {
        if (err) throw err;
        // 결과가 없거나, 데이터가 없을 경우 최대 ID를 0으로 설정합니다.
        const maxId = result[0].maxId ? result[0].maxId : 0;
        // 새로운 ID는 현재 최대 ID에 1을 더한 값입니다.
        const newId = maxId + 1;
        // 새로운 메모를 데이터베이스에 삽입합니다.
        const query = 'INSERT INTO memos (id, title, text, image) VALUES (?, ?, ?, ?)';
        db.query(query, [newId, title, text, imagePath], (err, result) => {
            if (err) throw err;
            res.redirect('/');
        });
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
