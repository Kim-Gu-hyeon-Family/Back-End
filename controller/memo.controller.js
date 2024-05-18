// // const db = require('../db');

// // Read
// exports.getMemos = (req, res) => {
//     const query = 'SELECT * FROM memos';
//     db.query(query, (err, results) => {
//         if (err) throw err;
//         res.render('memoList', { title: 'Memos App', memos: results });
//     });
// };

// // Create
// exports.getAddMemoForm = (req, res) => {
//     res.render('addMemo', { title: 'Add New Memo' });
// };

// exports.createMemo = (req, res) => {
//     const { title, text } = req.body;
//     let imagePath = null;
//     if (req.file) {
//         imagePath = `/uploads/${req.file.filename}`;
//     }
//     const findMaxIdQuery = 'SELECT MAX(id) AS maxId FROM memos';
//     db.query(findMaxIdQuery, (err, result) => {
//         if (err) throw err;
//         const maxId = result[0].maxId ? result[0].maxId : 0;
//         const newId = maxId + 1;
//         const query = 'INSERT INTO memos (id, title, text, image) VALUES (?, ?, ?, ?)';
//         db.query(query, [newId, title, text, imagePath], (err, result) => {
//             if (err) throw err;
//             res.redirect('/');
//         });
//     });
// };

// // Edit
// exports.getEditMemoForm = (req, res) => {
//     const memoId = req.params.id;
//     const query = 'SELECT * FROM memos WHERE id = ?';
//     db.query(query, [memoId], (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//             res.render('editMemo', { memo: result[0] });
//         } else {
//             return res.status(404).send('Memo not found');
//         }
//     });
// };

// // Update
// exports.updateMemo = (req, res) => {
//     const memoId = req.params.id;
//     const { title, text } = req.body;
//     let imagePath = req.body.imagePath;
//     if (req.file) {
//         imagePath = `/uploads/${req.file.filename}`;
//     }
//     const query = 'UPDATE memos SET title = ?, text = ?, image = ? WHERE id = ?';
//     db.query(query, [title, text, imagePath, memoId], (err, result) => {
//         if (err) throw err;
//         res.redirect('/memos');
//     });
// };

// // Delete
// exports.deleteMemo = (req, res) => {
//     const memoId = req.params.id;
//     const query = 'DELETE FROM memos WHERE id = ?';
//     db.query(query, [memoId], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Failed to delete memo');
//         } else {
//             res.sendStatus(204); // No Content
//         }
//     });
// };

// Read
exports.getMemos = async (req, res, prisma) => {
    const memos = await prisma.memos.findMany();
    res.render('memoList', { title: 'Memos App', memos });
};

// Create
exports.getAddMemoForm = (req, res) => {
    res.render('addMemo', { title: 'Add New Memo' });
};

exports.createMemo = async (req, res, prisma) => {
    const { title, text } = req.body;
    let imagePath = null;

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }

    await prisma.memos.create({
        data: {
            title,
            text,
            image: imagePath,
        },
    });

    res.redirect('/');
};

// Edit
exports.getEditMemoForm = async (req, res, prisma) => {
    const memoId = parseInt(req.params.id);
    const memo = await prisma.memos.findUnique({ where: { id: memoId } });

    if (memo) {
        res.render('editMemo', { memo });
    } else {
        res.status(404).send('Memo not found');
    }
};

// Update
exports.updateMemo = async (req, res, prisma) => {
    const memoId = parseInt(req.params.id);
    const { title, text } = req.body;
    let imagePath = req.body.imagePath;

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }

    await prisma.memos.update({
        where: { id: memoId },
        data: { title, text, image: imagePath },
    });

    res.redirect('/memos');
};

// Delete
exports.deleteMemo = async (req, res, prisma) => {
    const memoId = parseInt(req.params.id);

    try {
        await prisma.memos.delete({ where: { id: memoId } });
        res.sendStatus(204); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete memo');
    }
};