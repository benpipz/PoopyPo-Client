import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles.css";
import Icons from "../../assets/Icons";

const MyInfoWindow = ({ upvotes, setUpvotes, getRoute }) => {
  return (
    <div className="smallCol">
      <button
        style={{ margin: "1px" }}
        className="btn btn-success"
        onClick={() => setUpvotes(upvotes + 1)}
      >
        <div className="smallContainer">
          I approve!
          <Icons iconType={"Like"} />
        </div>
      </button>
      <button
        style={{ margin: "1px" }}
        className="btn btn-warning"
        onClick={() => setUpvotes(upvotes - 1)}
      >
        <div className="smallContainer">
          Nope
          <Icons iconType={"Dislike"} />
        </div>
      </button>
      <button
        style={{ margin: "1px" }}
        className="btn btn-primary"
        onClick={() => getRoute()}
      >
        <div className="smallContainer">
          Go!
          <Icons iconType={"Go"} />
        </div>
      </button>
      <p>upvotes: {upvotes}</p>
      <p>Reporter: Shraga Shragovitch</p>
    </div>
  );
};

export default MyInfoWindow;
