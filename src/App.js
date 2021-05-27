import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DetailsScreen from "./components/DetailsScreen/DetailsScreen";
import { login, logout, selectUserEmail } from "./features/user/userSlice";
import { auth } from "./firebase";

function App() {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            name: authUser.displayName,
            email: authUser.email,
            photo: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div>
      {/* <Router>
        {userEmail ? (
          <LoginScreen />
        ) : (
          <Fragment>
            <Header />
            <Switch>
              <Route path="/details/:id" exact component={DetailsScreen} />
              <Route path="/" exact component={HomeScreen} />
            </Switch>
          </Fragment>
        )}
      </Router> */}

      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route path="/details/:id" exact component={DetailsScreen} />
            <Route path="/" exact component={HomeScreen} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
