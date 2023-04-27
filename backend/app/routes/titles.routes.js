module.exports = app => {
    const titles = require("../controllers/titles.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", titles.create);

    // // Retrieve all Tutorials
    router.get("/", titles.findAll);
    // router.get("/faculty", users.findAllFaculty);
    // router.get("/facultyGroup", users.findAllFacultyGroup);
    // router.get("/group", users.findAllGroup);
    // router.get("/reviewer", users.findAllReviewer);
    // // // Retrieve all published Tutorials
    // // router.get("/published", tutorials.findAllPublished);

    // // // Retrieve a single Tutorial with id
    // router.get("/:email/:password", users.findOne);
    router.get("/:id", titles.findById);
    router.get("/user_id/:user_id", titles.findByUserId);

    // // // Update a Tutorial with id
    router.put("/:id", titles.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);

    app.use('/api/titles', router);
};