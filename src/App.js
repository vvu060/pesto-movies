import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DetailsScreen from "./components/DetailsScreen/DetailsScreen";
import PlansScreen from "./components/PlansScreen/PlansScreen";
import {
  login,
  logout,
  selectUserId,
  subscribe,
} from "./features/user/userSlice";
import db, { auth } from "./firebase";

function App() {
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      db.collection("customers")
        .doc(userId)
        .collection("subscriptions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (subscription) => {
            dispatch(subscribe({ subscription: subscription.data().role }));
          });
        });
    }
  }, [userId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            name: authUser.displayName,
            email: authUser.email,
            photo: authUser.photoURL,
            userId: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/plans" exact component={PlansScreen} />
          <Route path="/details/:id" exact component={DetailsScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/" exact component={HomeScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
