const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user_type: req.body.user_type,
        is_verified: req.body.is_verified,
        section: req.body.section,
        user_define_id: req.body.user_define_id,
        expertise: req.body.expertise,
        members: req.body.expertise,
    };

    // Save Tutorial in the database
    Users.create(user)
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

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    Users.findAll({ where: condition })
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

exports.findAllFacultyGroup = (req, res) => {
    // const email = req.query.email;
    // var condition = email ? { user_type: 'faculty' } : null;

    Users.findAll({
        where: {
            [Op.or]: [
                { user_type: "faculty" },
                { user_type: "capstone_group" },
            ]
        }
    })
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

exports.findAllFaculty = (req, res) => {
    // const email = req.query.email;
    // var condition = email ? { user_type: 'faculty' } : null;

    Users.findAll({
        where: {
            [Op.and]: [
                { user_type: "faculty" },
                { is_verified: true },
            ]
        }
    })
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

exports.findAllGroup = (req, res) => {
    // const email = req.query.email;
    // var condition = email ? { user_type: 'faculty' } : null;

    Users.findAll({
        where: {
            [Op.or]: [
                { user_type: "capstone_group" },
            ]
        }
    })
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

// exports.findAllReviewer = (req, res) => {
//     // const email = req.query.email;
//     // var condition = email ? { user_type: 'faculty' } : null;

//     Users.findAll({
//         where: {
//             [Op.or]: [
//                 { user_type: "reviewer" }
//             ]
//         }
//     })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };

// // Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const email = req.params.email;
    const password = req.params.password;
    Users.findOne({ where: { email: email, password: password } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Users with email=${email}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Users with email=" + email
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id
    Users.findOne({ where: { id: id } })
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

// // Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Users.update(req.body, {
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

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Tutorial.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Tutorial was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Tutorial with id=" + id
//             });
//         });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     Tutorial.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({ message: `${nums} Tutorials were deleted successfully!` });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all tutorials."
//             });
//         });
// };

// // find all published Tutorial
// exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };