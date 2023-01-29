import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleUser from "./SingleUser";

const GetAllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [singleUser, setSingleUser] = useState("");

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    axios
      .get("http://localhost:3015/api/getAllUser")
      .then((res) => {
        if (res.status === 200) {
          setAllUser(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row">
      <div className="col-3 allbox mt-3 mb-5 ms-5">
        {allUser.length > 0 &&
          allUser.map((item, i) => {
            return (
              <>
                <div
                  role="button"
                  onClick={() => {
                    setSingleUser({ user: item, index: i });
                  }}
                  style={{
                    padding: "2px",
                    paddingLeft: "20px",
                    paddingTop: "26px",
                    paddingBottom: "26px",
                    border: `${
                      singleUser.index === i ? "3px" : "1px"
                    } solid black`,
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  key={i}
                >
                  <div className="me-2">
                    <div>
                      <span>Name: </span>
                      <bdi>{item.name}</bdi>
                    </div>
                    <div>
                      <span>Email: </span>
                      <bdi>{item.email}</bdi>
                    </div>
                    <div>
                      <span>Country: </span>
                      <bdi>{item.country}</bdi>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="col-8 singleuser">
        <div>
          <SingleUser user={singleUser?.user} />
        </div>
      </div>
    </div>
  );
};

export default GetAllUser;
