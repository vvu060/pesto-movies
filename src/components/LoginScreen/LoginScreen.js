import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { auth, providerGoogle } from "../../firebase";
import { login } from "../../features/user/userSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signInGoogle = () => {
    auth
      .signInWithPopup(providerGoogle)
      .then((result) => {
        let user = result.user;
        console.log(user);
        dispatch(
          login({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            userId: user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="grid place-items-center h-screen w-full bg-gradient-to-br from-blue-900 via-gray-700 to-gray-800">
      <div className="relative  h-80 w-60 bg-gray-300 bg-opacity-70 shadow-sm">
        <div className="flex justify-center">
          <img
            loading="lazy"
            className="h-24 w-24 object-contain"
            src="https://pesto.tech/pesto-logo-black.png"
            alt="Pesto Logo"
          />
        </div>

        <h1 className="text-lg font-bold text-gray-900 text-center mt-10">
          Sign In with
        </h1>

        <div className="flex justify-center mt-12">
          <button
            onClick={signInGoogle}
            className="flex items-center text-lg font-bold px-5 py-3 m-2 bg-gray-500 shadow-md rounded-lg w-40 text-center"
          >
            <img
              loading="lazy"
              className="w-8 h-8 object-contain mr-2"
              src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png"
              alt=""
            />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

// className="relative grid place-items-center opacity-90"
