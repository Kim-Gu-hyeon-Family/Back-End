// require('dotenv').config();
// const express = require('express');
// const app = express();
// const memoRoutes = require('./routes/memo');
// const imageRoutes = require('./routes/image');
// const MainRoutes = require('./routes/index');

// app.set('view engine', 'ejs');

// app.use('/uploads', express.static('uploads'));
// app.use('/memos', memoRoutes);
// app.use('/upload', imageRoutes);
// app.use('/', MainRoutes);

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Prisma Client 인스턴스 초기화
async function main() {
    await prisma.$connect();

    // View engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Routes
    const memoRoutes = require('./routes/memo');
    const imageRoutes = require('./routes/image');
    const MainRoutes = require('./routes/index');

    app.use('/memos', memoRoutes(prisma));
    app.use('/upload', imageRoutes);
    app.use('/', MainRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });