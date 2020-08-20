"use strict";

const mongodbSvc = require("./mongodbSvc");

module.exports = {
  createCourse: async (root, { input }) => {
    let result;

    const newCourse = {
      name: "",
      description: "",
      ...input,
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
  editCourse: async (root, { _id, input }) => {
    let result;
    try {
      await mongodbSvc.update("courses", _id, input);
      result = await mongodbSvc.get("courses", _id);
    } catch (error) {
      console.error(error);
    }
    return result;
  },
  deleteCourse: async (root, { _id }) => {
    let result;
    try {
      const { deletedCount } = await mongodbSvc.delete("courses", _id);
      if (deletedCount) {
        result = { _id };
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  },
};
