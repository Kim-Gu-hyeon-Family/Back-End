const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
    res.redirect('/auth/register');
});

module.exports = router;
