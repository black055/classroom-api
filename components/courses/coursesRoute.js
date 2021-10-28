const express = require('express');
const router = express.Router();

const coursesController = require('./coursesController');

router.get('/', async function(req, res, next) {
    const courses = await coursesController.getAll();
    res.json(courses);
});

router.post('/', async function(req, res, next) {
    const successful = await coursesController.addCourse({
        courseID: req.body.courseID,
        courseName: req.body.courseName,
        courseDesc: req.body.courseDesc
    });
    res.send(successful);
});

module.exports = router;
