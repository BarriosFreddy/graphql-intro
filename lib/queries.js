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
  getPeople: async () => {
    let courses = [];
    try {
      courses = await mongodbService.getAll("students", {});
    } catch (error) {
      console.error(error);
    }
    return courses;
  },
  getPerson: async (root, args) => {
    let courses = [];
    const { id } = args;
    try {
      courses = await mongodbService.get("students", id);
    } catch (error) {
      console.error(error);
    }
    return courses;
  },
  GeneralSearch: async (root, { keyword }) => {
    let items = [];
    try {
      let courses = [];
      let people = [];
      people = await mongodbService.getAll("students", {
        $text: {
          $search: keyword,
        },
      });
      courses = await mongodbService.getAll("courses", {
        $text: {
          $search: keyword,
        },
      });
      items = [...people, ...courses];
    } catch (error) {
      console.error(error);
    }
    return items;
  },
};
