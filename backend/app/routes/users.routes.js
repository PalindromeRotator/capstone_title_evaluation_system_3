module.exports = app => {
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", users.create);

    // // Retrieve all Tutorials
    router.get("/", users.findAll);
    router.get("/faculty", users.findAllFaculty);
    router.get("/facultyGroup", users.findAllFacultyGroup);
    router.get("/group", users.findAllGroup);
    // router.get("/reviewer", users.findAllReviewer);
    // // // Retrieve all published Tutorials
    // // router.get("/published", tutorials.findAllPublished);

    // // // Retrieve a single Tutorial with id
    router.get("/:email/:password", users.findOne);
    router.get("/:id", users.findById);

    // // // Update a Tutorial with id
    router.put("/:id", users.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api/users', router);
};