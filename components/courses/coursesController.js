const Courses = require('./coursesModel');

module.exports = {
    getAll() {
        return Courses.find();
    },

    async addCourse(course) {
        const checkExist = await Courses.find({courseID: `${course.courseID}`});
        if (checkExist.length) {
            // Tồn tại lớp học trùng ID
            return false;
        } else {
            const newCourse = new Courses({
                courseName: course.courseName,
                courseID: course.courseID,
                courseDesc: course.courseDesc
            });
            newCourse.save();
            return true;
        }
    },

    async getCourseByID(courseID) {
        const result = await Courses.find({courseID: `${courseID}`});
        return result;
    }
}