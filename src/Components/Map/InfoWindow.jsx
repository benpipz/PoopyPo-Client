import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles.css";
import Icons from "../../assets/Icons";
import { auth } from "../../../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Put } from "../../Utils/ApiUtil";
import { useDispatch } from "react-redux";
import { updateVotesForPoint } from "../../store/mapSlice";

const MyInfoWindow = ({ point, getRoute }) => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  const UpdateVote = async (newVoteScore) => {
    const url = `points/${point.id}/${newVoteScore}`;
    const data = { id: point.id, votes: newVoteScore };
    const result = await Put(url);
    if (result.status === 200) {
      dispatch(updateVotesForPoint(data));
    }
  };

  return (
    <div>
      {!user ? (
        <div>
          <p>upvotes: {point.votes}</p>
          <p>Reporter: {point.user.name}</p>
        </div>
      ) : (
        <div className="smallCol">
          <button
            style={{ margin: "1px" }}
            className="btn btn-success"
            onClick={async () => await UpdateVote(point.votes + 1)}
          >
            <div className="smallContainer">
              I approve!
              <Icons iconType={"Like"} />
            </div>
          </button>
          <button
            style={{ margin: "1px" }}
            className="btn btn-warning"
            onClick={async () => await UpdateVote(point.votes - 1)}
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
          <p>upvotes: {point.votes}</p>
          <p>Reporter: {point.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default MyInfoWindow;
