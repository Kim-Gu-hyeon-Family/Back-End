const prisma = require('../../../../prisma');
const { comparePasswords } = require('../../../../utils/authUtils');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await comparePasswords(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.user = {
            id: user.id,
            email: user.email,
        };

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
