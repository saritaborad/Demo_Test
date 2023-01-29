import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleUser = ({ user }) => {
  const [elapsedTime, setElapsedTime] = useState(null);
  const [download, setDownload] = useState(null);
  const navigate = useNavigate();

  const handleDownload = (url) => {
    let start = new Date().getTime();
    let end;
    let timeDiff;
    axios
      .get(`${url}`, {
        responseType: "blob",
        onDownloadProgress: (progress) => {
          const percent = Math.round((progress.loaded * 100) / progress.total);
          setDownload(percent);

          if (percent === 100) {
            end = new Date().getTime();
            timeDiff = end - start;
            setElapsedTime(timeDiff);
            setTimeout(() => {
              setDownload(null);
            }, 1000);
          }
        },
      })
      .then((res) => {
        let blob = new Blob([res.data], { type: "application/pdf" });
        let ele = document.createElement("a");
        ele.href = URL.createObjectURL(blob);
        ele.download = "document.pdf";
        ele.click();
      });
  };
  return (
    <div>
      <button
        className="btn btn-outline-primary mt-3 me-3"
        style={{ float: "right" }}
        onClick={() => {
          navigate("/");
        }}
      >
        Add New User
      </button>
      {user && (
        <div className="view">
          <div>
            <div className="txt-label">
              <span>Customer Name: </span>
              <bdi>{user.name}</bdi>
            </div>
            <div className="txt-label">
              <span>Email: </span>
              <bdi>{user.email}</bdi>
            </div>
            <div className="txt-label">
              <span>Phone: </span>
              <bdi>{user.phone}</bdi>
            </div>
            <div className="txt-label">
              <span>Country: </span>
              <bdi>{user.country}</bdi>
            </div>
            <div className="txt-label">
              <span>Additional Info: </span>
              <bdi>{user.info}</bdi>
            </div>
          </div>
          <div className="txt-label">
            <embed src={user.doc}></embed>
          </div>
          <div className="txt-label">
            <button
              className="txt-label btn btn-outline-primary"
              onClick={() => handleDownload(user.doc)}
            >
              Download
            </button>
            {download && (
              <div className="progress mt-2" style={{ width: "50%" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={download}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width: `${download}%`,
                    backgroundColor: "rgb(255 41 41 / 60%)",
                  }}
                >
                  {`${download}%`}
                </div>
              </div>
            )}
            {download && (
              <span className="txt-label">ElapsedTime:- {elapsedTime} ms</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUser;
