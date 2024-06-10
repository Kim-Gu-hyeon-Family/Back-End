const prisma = require('../../../../prisma');
const { hashPassword } = require('../../../../utils/authUtils');

exports.registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                updatedAt: new Date(),
            },
        });

        res.status(200).json({ status: 200, message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ status: 500, message: 'Something went wrong', error: error.message });
    } finally {
        await prisma.$disconnect();
    }
};