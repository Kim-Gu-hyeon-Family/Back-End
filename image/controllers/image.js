// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// exports.updateMemoImage = (req, res) => {
//     const memoId = req.params.id;
//     let imagePath = null;

//     if (req.file) {
//         imagePath = `/uploads/${req.file.filename}`;
//     }

//     const query = 'UPDATE memos SET image = ? WHERE id = ?';
//     db.query(query, [imagePath, memoId], (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'Image updated' });
//     });
// };

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');

exports.updateMemoImage = async (req, res, prisma) => {
    const memoId = parseInt(req.params.id);

    let imagePath = null;

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }

    try {
        const updatedMemo = await prisma.memo.update({
            where: {
                id: memoId,
            },
            data: {
                image: imagePath,
            },
        });

        res.json({ message: 'Image updated', updatedMemo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};