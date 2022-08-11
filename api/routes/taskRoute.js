module.exports = function (app) {
    const taskController = require("../controllers/taskController");

    app.route("/task")
        .get(taskController.listTask)
        .post(taskController.createTask);

    app.route("/task/:id")
        .get(taskController.infoTask)
        .put(taskController.updateTask)
        .delete(taskController.deleteTask);
};
