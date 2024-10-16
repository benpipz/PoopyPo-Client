import React, { useEffect } from "react";
import { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles.css";
import Icons from "../../assets/Icons";
import { auth } from "../../../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Get, Put } from "../../Utils/ApiUtil";
import { useDispatch } from "react-redux";
import { updateVotesForPoint } from "../../store/mapSlice";
import { useState } from "react";
import { Point } from "../../Types/Infra";

interface MyInfoWindowType {
  point: Point;
  getRoute: any;
}

enum Action {
  None,
  Upvote,
  Downvote,
}
const MyInfoWindow: FC<MyInfoWindowType> = ({ point, getRoute }) => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const [action, setAction] = useState<Action>(0);

  const UpdateVote = async (newVoteScore, action) => {
    const url = `Points/${point.id}`;
    const data = { id: point.id, votes: newVoteScore };
    const result = await Put(url, {
      userId: point.userId,
      interaction: action,
    });
    if (result.status === 200) {
      dispatch(updateVotesForPoint(data));
      await getLastAction();
    }
  };

  const getLastAction = async () => {
    const url = `Points/${point.id}/${point.user.id}`;
    const result = await Get(url);
    setAction(result);
  };
  useEffect(() => {
    getLastAction();
  }, []);

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
            onClick={async () => await UpdateVote(point.votes + 1, 1)}
            disabled={action === 1}
          >
            <div className="smallContainer">
              I approve!
              <Icons iconType={"Like"} />
            </div>
          </button>
          <button
            style={{ margin: "1px" }}
            className="btn btn-warning"
            onClick={async () => await UpdateVote(point.votes - 1, 2)}
            disabled={action === 2}
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
