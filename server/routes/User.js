const express = require("express");
const {
  getAllUser,
  addUser,
  getUserDetail,
  getAllCountry,
} = require("../Controller/User");
const multer = require("multer");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname?.split(" ").join("-");
    cb(null, Date.now() + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only pdf format allowed!"));
    }
  },
});

router.get("/getAllUser", getAllUser);
router.post("/addUser", upload.single("doc"), addUser);
router.post("/getUserDetail", getUserDetail);
router.get("/countries", getAllCountry);

module.exports = router;
