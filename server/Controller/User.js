const { count } = require("../Model/User");
const User = require("../Model/User");
let Country = require("country-state-city").Country;

exports.addUser = async (req, res, next) => {
  const { name, email, phone, country, info } = req.body;
  const url = req.protocol + "://" + req.get("host");
  const addInfo = await User({
    name,
    email,
    phone,
    country,
    info,
    doc: url + "/public/uploads/" + req.file.filename,
  });
  addInfo
    .save()
    .then((result) => {
      res
        .status(200)
        .json({ message: "User Detail addded successfully!", data: addInfo });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "All User get successfully!", data: users });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserDetail = async (req, res, next) => {
  const { _id } = req.body;
  const userInfo = await User.findById({ _id });
  res
    .status(200)
    .json({ message: "User detail get successfully!", data: userInfo });
};

exports.getAllCountry = async (req, res, next) => {
  let arr = [];
  const country = await Country.getAllCountries();

  for (item of country) {
    let obj = {};
    obj.name = item.name;
    obj.isoCode = item.isoCode;
    arr.push(obj);
  }
  res.status(200).json({ message: "All country get successfully!", data: arr });
};
