const courses = [
  {
    _id: "id1",
    name: "GraphQl",
    description: " description",
    teacher: "Teacher",
    year: "2019",
  },
  {
    _id: "id2",
    name: "JS",
    description: " description",
    teacher: "Teacher",
    year: "2019",
  },
  {
    _id: "id3",
    name: "Node",
    description: " description",
    teacher: "Teacher",
    year: "2019",
  },
];
module.exports = {
  Query: {
    getCourses: () => {
      return courses;
    },
    getCourse: (root, args) => {
        const course = courses.filter(course => course._id === args.id)
        return course[0];
      },
  },
};
