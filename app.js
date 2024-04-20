const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const db = require('./db');
const app = express();
const upload = multer({ dest: 'uploads/' });
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const query = 'SELECT * FROM memos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('memoList', { title: 'Memos App', memos: results });
    });
});

app.get('/memos/add', (req, res) => {
    res.render('addMemo', { title: 'Add New Memo' });
});

app.post('/memos', upload.single('image'), (req, res) => {
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
});

app.get('/memos/edit/:id', (req, res) => {
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
});

app.post('/memos/edit/:id', upload.single('image'), (req, res) => {
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
});

app.put('/memos/:id/image', upload.single('image'), (req, res) => {
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

app.delete('/memos/delete/:id', (req, res) => {
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
});

app.get('/memos', (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
