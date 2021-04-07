const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(422).json({
            status: 'validation error',
            code: 422,
            message: validate
        });
    }

    const user = await User.findOne({
        where: {email: req.body.email}
    });

    if (!user) {
        return res.status(404).json({
            status: 'not found',
            code: 404
        });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({
            status: 'unauthenticated',
            code: 401
        });
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession
        }
    });
}