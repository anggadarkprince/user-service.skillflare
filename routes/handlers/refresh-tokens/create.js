const {User, RefreshToken} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const refreshToken = req.body.refresh_token;

    const schema = {
        refresh_token: 'string|empty:false',
        user_id: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(422).json({
            status: 'validation error',
            code: 422,
            message: validate
        });
    }

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            status: 'error',
            code: 404,
        });
    }

    const createdRefreshToken = await RefreshToken.create({
        token: refreshToken,
        user_id: userId
    });

    return res.json({
        status: 'success',
        data: {
            id: createdRefreshToken.id
        }
    });
}