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
        comment: req.body.comment,
        user_id: req.body.user_id,
        requests: req.body.requests,
        coordinator_requests: req.body.coordinator_request,
        createdAt: req.body.createdAt
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

exports.update = (req, res) => {
    const id = req.params.id;
    Titles.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: req.body
                });

            } else {
                res.send({
                    message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id
    Titles.findOne({ where: { id: id } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Users with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

exports.findByUserId = (req, res) => {
    const user_id = req.params.user_id
    Titles.findOne({ where: { user_id: user_id } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Users with id=${user_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + user_id
            });
        });
};