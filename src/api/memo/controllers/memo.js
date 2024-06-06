// Read
exports.getMemos = async (_, res, prisma) => {
    try {
        const memos = await prisma.memos.findMany();
        res.status(200).json({ title: 'Memos App', memos });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve memos' });
    }
};

// Create
exports.getAddMemoForm = (_, res) => {
    res.status(200).json({ title: 'Add New Memo' });
};

exports.createMemo = async (req, res, prisma) => {
    const { title, text } = req.body;
    let imagePath = null;

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }

    try {
        const memo = await prisma.memos.create({
            data: {
                title,
                text,
                image: imagePath,
            },
        });
        res.status(201).json({ message: 'Memo created', memo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create memo' });
    }
};

// Edit
exports.getEditMemoForm = async (req, res, prisma) => {
    const memoId = parseInt(req.params.id);

    try {
        const memo = await prisma.memos.findUnique({ where: { id: memoId } });
        if (memo) {
            res.status(200).json({ memo });
        } else {
            res.status(404).json({ error: 'Memo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve memo' });
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

    try {
        const memo = await prisma.memos.update({
            where: { id: memoId },
            data: { title, text, image: imagePath },
        });
        res.status(200).json({ message: 'Memo updated', memo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update memo' });
    }
};

// Delete
exports.deleteMemo = async (req, res, prisma) => {
    const memoId = parseInt(req.params.id);

    try {
        await prisma.memos.delete({ where: { id: memoId } });
        res.sendStatus(204); // No Content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete memo' });
    }
};
