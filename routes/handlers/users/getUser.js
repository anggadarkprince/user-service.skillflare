const {User} = require('../../../models');

module.exports = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'avatar', 'role', 'profession']
    });

    if (!user) {
        return res.status(404).json({
            status: 'not found',
            code: 404,
        });
    }

    return res.json({
        status: 'success',
        code: 200,
        data: user
    });
}