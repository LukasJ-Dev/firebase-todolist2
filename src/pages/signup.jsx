import React from "react";
import styled from "styled-components";
import Input from "../components/UI/input";
import StandardLayout from "../components/standard-layout";
import { Center } from "../components/UI/styles";
import { colors } from "../styles/colors";
import Button from "../components/UI/button";
import { registerEmailPassword } from "../firebase/firebase_auth";

const SignupCard = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 12px;
`;

export default function SignUp({ setPage }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    registerEmailPassword(
      event.target["email"].value,
      event.target["password"].value
    );
  };

  return (
    <StandardLayout page="signup">
      <Center>
        <SignupCard onSubmit={handleSubmit}>
          <Input label="Email" type="email" id="email" name="email" />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
          />
          <Input
            label="Password Again"
            type="password"
            id="passwordAgain"
            name="passwordAgain"
          />
          <Button type="submit">Sign Up</Button>
          <Button color={colors.blue["300"]} onClick={() => setPage("signin")}>
            Sign In
          </Button>
        </SignupCard>
      </Center>
    </StandardLayout>
  );
}
