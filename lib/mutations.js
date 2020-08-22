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
  createPerson: async (root, { input }) => {
    let result;

    const newCourse = {
      name: "",
      email: "",
      ...input,
    };

    try {
      const { insertedId } = await mongodbSvc.save("students", newCourse);
      result = {
        _id: insertedId,
        ...newCourse,
      };
    } catch (error) {
      console.error(error);
    }
    return result;
  },
  editPerson: async (root, { _id, input }) => {
    let result;
    try {
      await mongodbSvc.update("students", _id, input);
      result = await mongodbSvc.get("students", _id);
    } catch (error) {
      console.error(error);
    }
    return result;
  },
  deletePerson: async (root, { _id }) => {
    let result;
    try {
      const { deletedCount } = await mongodbSvc.delete("students", _id);
      if (deletedCount) {
        result = { _id };
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  },
};
