require('dotenv').config();
const express = require('express');
const app = express();
const memoRoutes = require('./routes/memo');
const imageRoutes = require('./routes/image');
const MainRoutes = require('./routes/index');

app.set('view engine', 'ejs');

app.use('/uploads', express.static('uploads'));
app.use('/memos', memoRoutes);
app.use('/upload', imageRoutes);
app.use('/', MainRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
