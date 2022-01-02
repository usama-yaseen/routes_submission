var express = require("express");
var router = express.Router();
var fs= require("fs")
const path = require('path');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Head Router");
});

router.get("/materials/lec1", function (req, res, next) {
  var file = fs.createReadStream("./public/pdfs/lec1.pdf");
  file.pipe(res);
});
router.get("/materials/lec2", function (req, res, next) {
  var file = fs.createReadStream("./public/pdfs/lec2.pdf");
  file.pipe(res);
});
router.get("/materials/lec3", function (req, res, next) {
  var file = fs.createReadStream("./public/pdfs/lec3.pdf");
  file.pipe(res);
});
router.get("/materials/lec4", function (req, res, next) {
  var file = fs.createReadStream("./public/pdfs/lec4.pdf");
  file.pipe(res);
});

module.exports = router;