import React, { useEffect, useState } from "react";
import {
  isAlphabate,
  isNumber,
  isValidDoc,
  isValidEmail,
  isValidInfo,
  validateEmail,
  validateIsEmpty,
} from "./utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [country, setCountry] = useState("");
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    info: "",
    doc: "",
  });
  const [Error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    info: "",
    doc: "",
  });
  const [uploaded, setUploaded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCountry();
  }, []);

  const getAllCountry = () => {
    axios
      .get("http://localhost:3015/api/countries")
      .then((res) => {
        if (res.status === 200) {
          setCountry(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "name") {
      if (isAlphabate(e.target.value)) {
        setDetail((detail) => ({ ...detail, name: e.target.value }));
        setError((err) => ({ ...err, name: "" }));
      } else {
        setError((err) => ({ ...err, name: "Name should be alphabate" }));
      }
    }
    if (e.target.name === "email") {
      if (isValidEmail(e.target.value)) {
        setDetail((detail) => ({ ...detail, email: e.target.value }));
        setError((err) => ({ ...err, email: "" }));
      } else {
        setError((err) => ({ ...err, email: "Invalid email address" }));
      }
    }
    if (e.target.name === "phone") {
      if (isNumber(e.target.value)) {
        setDetail((detail) => ({ ...detail, phone: e.target.value }));
        setError((err) => ({ ...err, phone: "" }));
      } else {
        setError((err) => ({
          ...err,
          phone: "Phone Number should be numeric",
        }));
      }
    }
    if (e.target.name === "info") {
      if (isValidInfo(e.target.value)) {
        setDetail((detail) => ({ ...detail, info: e.target.value }));
        setError((err) => ({ ...err, info: "" }));
      } else {
        setError((err) => ({
          ...err,
          info: "Info must be valid",
        }));
      }
    }

    setDetail((detail) => ({ ...detail, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    let error = isValidDoc(file);
    if (error.doc !== "") {
      setError((err) => ({
        ...err,
        doc: error.doc,
      }));
    } else {
      setError((err) => ({ ...err, doc: "" }));
      setDetail((detail) => ({ ...detail, doc: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    const error = validateIsEmpty(detail);
    setError(() => ({ ...error }));
    if (
      Error.name == "" &&
      error.name == "" &&
      Error.email == "" &&
      error.email == "" &&
      Error.phone == "" &&
      error.phone == "" &&
      Error.country == "" &&
      error.country == "" &&
      Error.info == "" &&
      error.info == "" &&
      Error.doc == "" &&
      error.doc == ""
    ) {
      formData.append("name", detail.name);
      formData.append("email", detail.email);
      formData.append("phone", detail.phone);
      formData.append("country", detail.country);
      formData.append("info", detail.info);
      formData.append("doc", detail.doc);
      axios
        .post(`http://localhost:3015/api/addUser`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/pdf",
          },
          onUploadProgress: (progress) => {
            setUploaded(Math.round((progress.loaded * 100) / progress.total));
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("User added successfully!");
            navigate("/get-users");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      <div
        className="col-12 d-flex align-items-center justify-content-center"
        style={{ fontWeight: "bold", fontSize: "23px" }}
      >
        Add New User
      </div>
      <div className="col-12 d-flex align-items-center justify-content-center mt-2">
        <form className="col-md-5" onSubmit={handleSubmit}>
          <div className="">
            <div className="form-group pb-2 pt-2">
              <label>Customer Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control"
                onChange={handleChange}
                //   value={}
                name="name"
              />
              {Error?.name && (
                <span className="text-danger">{Error?.name}</span>
              )}
            </div>
            <div />
            <div className="form-group pb-2 pt-2">
              <label>Email:</label>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="Enter email"
                className="form-control"
              />
              {Error?.email && (
                <span className="text-danger">{Error?.email}</span>
              )}
            </div>
            <div className="form-group pb-2 pt-2">
              <label>Phone</label>
              <input
                onChange={handleChange}
                name="phone"
                placeholder="Enter Phone Number"
                className="form-control"
              />
              {Error?.phone && (
                <span className="text-danger">{Error?.phone}</span>
              )}
            </div>
            <div className="form-group pb-2 pt-2">
              <label>Country</label>
              <select
                className="form-select"
                name="country"
                onChange={handleChange}
              >
                {country.length > 0 &&
                  country.map((item, i) => {
                    return (
                      <option value={item.isoCode} key={i}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group pb-2 pt-2">
              <label>Additional Info</label>
              <input
                type="text"
                onChange={handleChange}
                name="info"
                placeholder="Enter info"
                className="form-control"
              />
              {Error.info && <span className="text-danger">{Error.info}</span>}
            </div>
            <div className="form-group pb-2 pt-2">
              <label>Upload Document</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                name="doc"
              />
              {Error.doc && <span className="text-danger">{Error.doc}</span>}
            </div>
            {uploaded && (
              <div className="progress mt-2">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={uploaded}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width: `${uploaded}%`,
                    backgroundColor: "rgb(255 41 41 / 60%)",
                  }}
                >
                  {`${uploaded}%`}
                </div>
              </div>
            )}
            <button className="btn btn-primary col-12" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
