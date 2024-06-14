const prisma = require('../../../../prisma');
const { comparePasswords } = require('../../../../utils/authUtils');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ status: 401, message: 'Invalid email or password' });
        }

        const isMatch = await comparePasswords(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: 401, message: 'Invalid email or password' });
        }

        req.session.user = {
            id: user.id,
            email: user.email,
        };

        return res.status(200).json({
            status: 200,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ status: 500, message: 'Failed to logout' });
        }
        res.status(200).json({ status: 200, message: 'Logout successful' });
    });
};