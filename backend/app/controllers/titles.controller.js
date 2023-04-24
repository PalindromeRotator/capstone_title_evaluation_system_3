const db = require("../models");
const Titles = db.titles;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Create a Tutorial
    const title = {
        group_name: req.body.group_name,
        section: req.body.section,
        adviser: req.body.adviser,
        panels: req.body.user_type,
        titles: req.body.titles,
        grades: req.body.grades,
        comment: req.body.comment
    };

    // Save Tutorial in the database
    Titles.create(title)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findAll = (req, res) => {

    Titles.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};