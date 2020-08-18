const mongodbService = require("./mongodbSvc");

module.exports = {
  getCourses: async () => {
    let courses = [];
    try {
      courses = await mongodbService.getAll("courses", {});
    } catch (error) {
      console.error(error);
    }
    return courses;
  },
  getCourse: async (root, args) => {
    let courses = [];
    const { id } = args;
    try {
      courses = await mongodbService.get("courses", id);
    } catch (error) {
      console.error(error);
    }
    return courses;
  },
};
