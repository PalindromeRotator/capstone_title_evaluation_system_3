module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        user_type: {
            type: Sequelize.STRING
        },
        is_verified: {
            type: Sequelize.BOOLEAN
        },
        password: {
            type: Sequelize.STRING
        },
        section: {
            type: Sequelize.STRING
        },
        user_define_id: {
            type: Sequelize.STRING
        },
        expertise: {
            type: Sequelize.STRING
        }
    });

    return User;
};