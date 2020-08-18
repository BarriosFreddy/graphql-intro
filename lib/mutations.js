"use strict";

const mongodbSvc = require("./mongodbSvc");

module.exports = {
  createCourse: async (root, { input }) => {
    let result;

    const newCourse = {
      name: "",
      description: "",
      ...input
    };

    try {
      const { insertedId } = await mongodbSvc.save("courses", newCourse);
      result = {
        _id: insertedId,
        ...newCourse,
      };
    } catch (error) {
      console.error(error);
    }
    return result;
  },
};
