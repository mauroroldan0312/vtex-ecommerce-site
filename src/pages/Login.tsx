import React from "react";
import { useUserContext } from "../shared";

const Login: React.FC = () => {
  const {
    userName,
    password,
    loading,
    error,
    handleLogin,
    setUsername,
    setPassword,
  } = useUserContext() ?? {};

  return (
    <div className="pa4 black-80 mt6 mw8 center pa3">
      <div
        className="measure center bg-white pa4"
        style={{ borderRadius: "8px" }}
      >
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign in</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="username">
              Username
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 black"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 black"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </fieldset>
        <div className="mt3">
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib flex items-center justify-center"
            onClick={handleLogin}
            style={{
              backgroundColor: "#4285F4",
              color: "white",
              borderRadius: "4px",
              border: "none",
              padding: "10px 24px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Login
          </button>
        </div>
        {loading && <p className="mt3">Loading...</p>}
        {error && <p className="mt3 red">Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default Login;
