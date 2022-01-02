var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

var ClassSchema = mongoose.Schema({
  Class: String,
  Courses: [
    {
      Course_id: String,
      CourseName: String,
      TeacherID: Number,
      Students: [
        {
          _id: Number,
          ref: String,
        },
      ],

      Quizzes: [
        {
          Questions: [{ Q: String, marks: Number }],
          Attempted: [
            { Student_ID: Number, Answers: [String], ObMarks: Number },
          ],
          TotalMarks: Number,
        },
      ],
      Assignments: [
        {
          Description: String,
          Questions: [{ Q: String, marks: Number }],
          Attempted: [{ Student_ID: Number, uploaded_file: String }],
        },
      ],
      Materials: [String],
      CourseResults: [{ student_id: Number, gpa: Number }],
    },
  ],
});
var Class = mongoose.model("Class", ClassSchema);

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("here");
  console.log(req);
  res.send("Teacher Router");
});

router.get("/getclass", (req, res, next) => {
  const connection = mongoose.connect("mongodb://localhost:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.then(
    (db) => {
      console.log("Connected correctly to server");

      Class.find({}).exec(function (err, data) {
        if (err) throw err;
        res.send(data);
      });
    },
    (err) => {
      console.log(err);
      console.log("Unable To Connect");
    }
  );
});

router.post("/changeName", (req, res, next) => {
  const connection = mongoose.connect("mongodb://localhost:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.then(
    (db) => {
      console.log("Connected correctly to server");
      var ClassSchema = mongoose.Schema({
        Class: String,
        Courses: [
          {
            Course_id: String,
            CourseName: String,
            TeacherID: Number,
            Students: [
              {
                _id: Number,
                ref: String,
              },
            ],

            Quizzes: [
              {
                Questions: [{ Q: String, marks: Number }],
                Attempted: [
                  { Student_ID: Number, Answers: [String], ObMarks: Number },
                ],
                TotalMarks: Number,
              },
            ],
            Assignments: [
              {
                Description: String,
                Questions: [{ Q: String, marks: Number }],
                Attempted: [{ Student_ID: Number, uploaded_file: String }],
              },
            ],
            Materials: [String],
            CourseResults: [{ student_id: Number, gpa: Number }],
          },
        ],
      });
      var Class = mongoose.model("Class", ClassSchema);

      Class.findOneAndUpdate(
        { Class: req.body.class_name },
        { Class: req.body.new_class_name },
        function (err, data) {
          if (err) throw err;
          res.send("Success");
        }
      );
    },
    (err) => {
      console.log(err);
      console.log("Unable To Connect");
    }
  );
});

router.get("/getStudents", (req, res, next) => {
  const connection = mongoose.connect("mongodb://localhost:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.then(
    () => {
      console.log("Connected correctly to server");

      Class.find({}).exec(function (err, data) {
        if (err) console.log(err);
        res.send({
          StudentData: data[0].Courses[0].Students,
          ClassData: {
            Class: data[0].Class,
            CourseID: data[0].Courses[0].Course_id,
          },
        });
      });
    },
    (err) => {
      console.log(err);
      console.log("Unable To Connect");
    }
  );
});

//SP19-BCS-008 Assignment 2
router.post("/addMarks", (req, res, next) => {
  const connection = mongoose.connect("mongodb://localhost:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.then(
    (db) => {
      console.log("Connected correctly to server");

      Class.findOne({ Class: req.body.class_name }).exec(function (err, data) {
        if (err) throw err;

        //Check If A Class with that name exists or not
        if (data === null) res.send("No Class With This Name Found");
        else {
          let found = false;
          data.Courses.forEach((element) => {
            console.log(element);
            //Checking to get the appropriate Course from the class
            if (element.Course_id == req.body.Course_id) {
              found = true;
              //Checking to See if A Student with the same Id Already Exists
              if (
                element.CourseResults.some((e) => e.student_id == req.body.S_ID)
              ) {
                res.send("Already Exists");
              } else if (element.Students.some((e) => e._id == req.body.S_ID)) {
                //Push the new Student's ID and Marks Object
                element.CourseResults.push({
                  student_id: req.body.S_ID,
                  gpa: req.body.marks,
                });
                //Call the save function to update
                data.save(function (error, data) {
                  if (error) {
                    console.log("Error = " + error);
                    res.send(error);
                  } else {
                    console.log("Data = " + data);
                    res.send("GPA Added");
                  }
                });
              } else {
                res.send("No Student With This Id FOUND");
              }
            }
          });
          if (!found) {
            res.send("No Course with this code found for the given class");
          }
        }
      });
    },
    (err) => {
      console.log(err);
      console.log("Unable To Connect");
    }
  );
});

//ADD CLASS IMPLEMENTED ( WITH DUMMY DATA ) TO TEST THE /addMarks Route
router.post("/addclass", (req, res, next) => {
  const connection = mongoose.connect("mongodb://localhost:27017/lms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.then(
    (db) => {
      console.log("Connected correctly to server");
      // Creating a new class Object
      //This is SUPPOSED TO COME FROM THE BODY
      var new_class = new Class({
        Class: "SP19-BCS-6A",
        Courses: [
          {
            Course_id: "CSC111",
            CourseName: "ICT",
            TeacherID: 21,
            Students: [
              {
                _id: 1,
                ref: "Student",
              },
            ],

            Quizzes: null,
            Assignments: null,
            Materials: null,
            CourseResults: [{ student_id: 1, gpa: 0 }],
          },
        ],
      });

      new_class.save(function (error, data) {
        if (error) {
          console.log("Error = " + error);
        } else {
          console.log("Data = " + data);
        }
        process.exit();
      });
    },
    (err) => {
      console.log(err);
      console.log("Unable To Connect");
    }
  );
});

module.exports = router;
