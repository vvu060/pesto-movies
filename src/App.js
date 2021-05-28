import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DetailsScreen from "./components/DetailsScreen/DetailsScreen";
import PlansScreen from "./components/PlansScreen/PlansScreen";
import {
  login,
  logout,
  selectUserEmail,
  subscribe,
} from "./features/user/userSlice";
import { auth } from "./firebase";
import Footer from "./components/Footer";

function App() {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

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
        {!userEmail ? (
          <LoginScreen />
        ) : (
          <Fragment>
            <Header />
            <Switch>
              <Route path="/plans" exact component={PlansScreen} />
              <Route path="/details/:id" exact component={DetailsScreen} />
              <Route path="/" exact component={HomeScreen} />
            </Switch>
            <Footer />
          </Fragment>
        )}
      </Router>
    </div>
  );
}

export default App;
