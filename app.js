const express = require('express');
const app = express();
const memoRoutes = require('./routes/memoRoutes');
const imageRoutes = require('./routes/imageRoutes');
const index = require('./routes/index');

app.set('view engine', 'ejs');

app.use('/uploads', express.static('uploads'));
app.use('/memos', memoRoutes);
app.use('/upload', imageRoutes);
app.use('/', index);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
