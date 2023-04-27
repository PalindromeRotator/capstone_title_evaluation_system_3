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
        user_id: {
            type: Sequelize.NUMBER
        },
        title1_blob: {
            type: Sequelize.BLOB
        },
        title2_blob: {
            type: Sequelize.BLOB
        },
        title3_blob: {
            type: Sequelize.BLOB
        }, requests: {
            type: Sequelize.STRING
        },
        coordinator_requests: {
            type: Sequelize.STRING
        }
    });

    return Title;
};