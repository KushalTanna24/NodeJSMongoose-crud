const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises-practice").then(() => {
  console.log("Connected to MongoDB");
});

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});
const Course = mongoose.model("Course", courseSchema);

// ==================================================
// Exercise 1
// ==================================================
async function exercise1() {
  const result = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  console.log(result);
}
exercise1().then(() => {
  console.log("Exercise 1 done");
});

// ==================================================
// Exercise 2
// ==================================================
async function exercise2() {
  const result = await Course.find({ isPublished: true })
    .or([{ tags: "backend" }, { tags: "frontend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1 });

  console.log(result);
}
exercise2().then(() => {
  console.log("Exercise 2 done");
});

// ==================================================
// Exercise 3
// ==================================================
const exercise3 = async () => {
  const result = await Course.find({
    isPublished: true,
  }).or([
    {
      price: { $gte: 15 },
    },
    {
      name: /.*by.*/i,
    },
  ]);

  console.log(result);
};
exercise3().then(() => {
  console.log("Exercise 3 done");
});

// ==================================================
// Create a new course
// ==================================================
const createCourse = async () => {
  const course = new Course({
    name: "Node.js Course",
    author: "Kushal",
    tags: ["backend", "frontend", "mobile"],
    isPublished: true,
    price: 15,
  });

  const result = await course.save();
  console.log(result);
};
/*
createCourse().then(() => {
  console.log("Course created");
});
*/

// ==================================================
// Update a course
// ==================================================
const updateCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    console.log("Course not found");
    return new Error();
  }

  course.isPublished = true;
  course.author = "Kushal";

  const result = await course.save();
  console.log(result);
};
/* 
updateCourse("62da411ef9b814b94a9d6b97").then(() => {
  console.log("Course updated");
}); 
*/

// ==================================================
// Remove a course
// ==================================================
const removeCourse = async (id) => {
  const result = await Course.findByIdAndDelete(id);
  console.log(result);
};
/* 
removeCourse("62da411ef9b814b94a9d6b9c").then(() => {
  console.log("Course removed");
});
*/
