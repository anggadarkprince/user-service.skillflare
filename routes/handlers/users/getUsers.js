const {User} = require('../../../models');

module.exports = async (req, res) => {
    const userIds = req.query.user_ids || [];
    const selectOption = {
        attributes: ['id', 'name', 'email', 'avatar', 'role', 'profession']
    };

    if (userIds.length) {
        selectOption.where = {
            id: userIds
        }
    }

    const users = await User.findAll(selectOption);

    return res.json({
        status: 'success',
        code: 200,
        data: users
    });
}