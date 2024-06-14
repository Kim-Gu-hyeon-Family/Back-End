require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const prisma = require('./prisma');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
})
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const memoRoutes = require('./src/api/memo/routes/memo')(prisma);
const imageRoutes = require('./src/api/image/routes/image');
const authRoutes = require('./src/api/auth/routes/auth');

app.use('/memos', memoRoutes);
app.use('/upload', imageRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Prisma Client 연결 및 해제
async function main() {
    await prisma.$connect();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
