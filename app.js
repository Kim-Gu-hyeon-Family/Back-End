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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
