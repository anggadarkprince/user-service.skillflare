const bcrypt = require('bcrypt');
const {Op} = require("sequelize");
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6|optional',
        profession: 'string|optional',
        avatar: 'string|optional'
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(422).json({
            status: 'validation error',
            code: 422,
            message: validate
        });
    }

    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            status: 'not found',
            code: 404,
        });
    }

    const email = req.body.email;
    if (email) {
        const checkEmail = await User.findOne({
            where: {
                email: email,
                id: {
                    [Op.not]: id,
                }
            }
        });

        if (checkEmail && email !== user.email) {
            return res.status(409).json({
                status: 'conflict',
                code: 409,
                message: 'Email already exist'
            })
        }
    }

    let password = user.passive;
    if (req.body.password) {
        password = await bcrypt.hash(req.body.password, 10);
    }
    const {name, profession, avatar} = req.body;

    await user.update({
        email,
        password,
        name,
        profession,
        avatar
    });

    return res.json({
        status: 'success',
        code: 200,
        data: {
            id: user.id,
            name,
            email,
            profession,
            avatar
        }
    });
}