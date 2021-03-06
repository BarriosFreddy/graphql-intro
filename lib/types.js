const mongodbSvc = require("./mongodbSvc");
const { ObjectId } = require("mongodb");

module.exports = {
  Course: {
    people: async ({ people }) => {
      let peopleArray = [];
      try {
        let peopleIDs = people ? people.map((id) => ObjectId(id)) : [];
        if (peopleIDs) {
          peopleArray = await mongodbSvc.getAll("students", {
            _id: { $in: peopleIDs },
          });
        }
      } catch (error) {
        console.error(error);
      }
      return peopleArray;
    },
  },
  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return "Monitor"
      }
      return "Student"
    }
  },
  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.phone) {
        return "Monitor"
      }
      if (item.title) {
        return "Course"
      }
      return "Student"
    }
  }
};
