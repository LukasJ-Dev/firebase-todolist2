import React from "react";
import styled from "styled-components";
import Input from "../components/UI/input";
import Navbar from "../components/UI/navbar";
import StandardLayout from "../components/standard-layout";
import { Center } from "../components/UI/styles";
import { colors } from "../styles/colors";
import Button from "../components/UI/button";
import { loginEmailPassword } from "../firebase/firebase_auth";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SignupCard = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 12px;
  padding-bottom: 20vh;
`;

export default function SignIn({ setPage }) {
  const dispatch = useDispatch();

  const [error, setError] = useState({
    general: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginEmailPassword(
      event.target["email"].value,
      event.target["password"].value
    )
      .then((cred) => {})
      .catch((error) => {
        // An error occurred during sign in
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          setError({
            general: "",
            email: "",
            password: "Wrong password",
          });
        } else if (errorCode === "auth/user-not-found") {
          setError({
            general: "",
            email: "Email not found",
            password: "",
          });
        } else {
          setError({
            general: errorMessage,
            email: "",
            password: "",
          });
        }
      });
  };

  return (
    <StandardLayout page="signin">
      <Center>
        <SignupCard onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            error={error.email}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            error={error.password}
          />
          <Button type="submit">Sign In</Button>
          <Button color={colors.blue["300"]} onClick={() => setPage("signup")}>
            New Account
          </Button>
        </SignupCard>
      </Center>
    </StandardLayout>
  );
}
