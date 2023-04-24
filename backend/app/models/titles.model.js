module.exports = (sequelize, Sequelize) => {
    const Title = sequelize.define("title", {
        group_name: {
            type: Sequelize.STRING
        },
        section: {
            type: Sequelize.STRING
        },
        adviser: {
            type: Sequelize.STRING
        },
        panels: {
            type: Sequelize.STRING
        },
        titles: {
            type: Sequelize.STRING
        },
        grades: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
    });

    return Title;
};