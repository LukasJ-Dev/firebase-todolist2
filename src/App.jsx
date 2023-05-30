import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, userAction } from "./features/user/userSlice";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignInAndSignUp from "./pages/signInAndSignUp";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      dispatch(userAction.login({ email: user.email, uid: user.uid }));
    }
  });

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard /> : <SignInAndSignUp />}
    </div>
  );
}

export default App;
