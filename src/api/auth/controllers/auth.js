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

        // 세션에 사용자 정보 저장
        req.session.user = {
            id: user.id,
            email: user.email,
            // 필요한 사용자 정보를 추가로 저장
        };

        // 로그인 성공 시 클라이언트에 응답 보내기
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                // 필요한 사용자 정보를 응답에 포함
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
