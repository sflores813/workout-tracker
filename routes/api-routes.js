const db = require("../models");
require("mongoose");

module.exports = (app) => {
    //---gathering workouts from the db
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    //---creating a new workout
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    //---Add a new exercise to the current exercise
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
            req.params.id, { $push: { exercises: req.body } }, { new: true, runValidators: true })
        .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    //---Return the last 7 workouts
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).limit(7).then(data => res.json(data))
            .catch(err => {
                res.json(err);
            });
    });
}