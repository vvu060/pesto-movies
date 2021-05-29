import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserEmail,
  selectUserPhoto,
  logout,
  selectUserSubscription,
} from "../../features/user/userSlice";
import Plans from "../Plans";
import { auth } from "../../firebase";

function PlansScreen() {
  const dispatch = useDispatch();
  const userSubscription = useSelector(selectUserSubscription);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-400 via-gray-700 to-gray-900 grid place-items-center overflow-x-hidden scrollbar-hide">
      <div className="text-gray-200 max-w-lg">
        <h1 className="font-bold text-xl pb-2 rounded-sm">Edit Profile</h1>
        <div className="flex items-start space-x-3">
          <img className="h-12 w-12" src={userPhoto} alt={userEmail} />

          <div>
            <h2 className="p-2 bg-gray-400 font-semibold text-sm w-full mb-1">
              {userEmail}
            </h2>
            <div>
              <h3 className="text-sm">
                Plans (Current Plan:{" "}
                <span className="text-red-500">
                  {userSubscription ? userSubscription : "None"})
                </span>
              </h3>

              <Plans />
              <button
                onClick={signOut}
                className="bg-gray-400 py-1 text-center w-full rounded-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlansScreen;
