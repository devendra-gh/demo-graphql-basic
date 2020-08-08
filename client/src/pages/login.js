import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LoginForm from "../components/loginform";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

const Login = () => {
  const client = useApolloClient();
  console.log("client", client);
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
};

export default Login;
