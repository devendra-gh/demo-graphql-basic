import React, { useState } from "react";

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    login({
      variables: {
        email: email,
      },
    });
  };

  return (
    <div className="loginform">
      <h1>Log In</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">
          <input
            type="text"
            placeholder="enter email"
            value={email}
            onChange={emailHandler}
          />
          <input className="btn" type="submit" value="Log In" />
        </label>
      </form>
    </div>
  );
};

export default LoginForm;
