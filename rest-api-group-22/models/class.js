const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
    max: 40,
  },
  teacherid: {
    tid: {
      type: Schema.Types.ObjectId,
      ref: "teacher",
    },
  },
  students: [
    {
      sid: {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
    },
  ],
  quizes: [
    {
      question: [String],
      answers: [
        {
          sid: {
            type: Schema.Types.ObjectId,
            ref: "student",
          },
          answer: [String],
          marksObtained: Number,
        },
      ],
      totalmarks: {
        type: Number,
      },
    },
  ],
  assignment: [
    {
      Questions: [
        {
          question: [String],
          
          marks: {
            type: Number,
          },
        },
      ],
      Attempted: [
        {
          studentid: {
            type: Schema.Types.ObjectId,
            ref: "student",
          },
          answer:[String],

        },
      ],
    },
  ],
  Material: ["./materails/couresid/intro.pdf"],
  
  Results: [
    {
      studentid: {
        type: Schema.Types.ObjectId,
        ref: "student",
      },
      GPA: {
        type: Number,
      },
    },
  ],
});

module.exports = Class = mongoose.model("class", ClassSchema);
