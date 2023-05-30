import React, { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function SignInAndSignUp() {
  const [page, setPage] = useState("signin");

  const ChangePage = (page) => {
    setPage(page);
  };

  return (
    <>
      {page === "signin" ? (
        <SignIn setPage={ChangePage} />
      ) : (
        <SignUp setPage={ChangePage} />
      )}
    </>
  );
}
