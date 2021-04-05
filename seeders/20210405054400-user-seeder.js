'use strict';

const bcrypt = require('bcrypt')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
            {
                name: 'Angga',
                email: 'anggadarkprince@gmail.com',
                password: await bcrypt.hash('anggaari', 10),
                role: 'admin',
                profession: 'Programmer',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Ari',
                email: 'angga.aw92@gmail.com',
                password: await bcrypt.hash('anggaari', 10),
                role: 'teacher',
                profession: 'Mentor',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
