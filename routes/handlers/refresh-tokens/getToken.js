const {RefreshToken} = require('../../../models');

module.exports = async (req, res) => {
    const refreshToken = req.query.refresh_token || req.body.refresh_token;

    const token = await RefreshToken.findOne({
        where: {token: refreshToken}
    });

    if (!token) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Invalid token'
        });
    }

    return res.json({
        status: 'success',
        code: 200,
        token
    });
}