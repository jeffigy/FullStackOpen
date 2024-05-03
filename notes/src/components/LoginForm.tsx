import React from "react";

type LoginFormProps = {
  handleSubmit: any;
  handleUsernameChange: any;
  handlePasswordChange: any;
  username: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({
  handlePasswordChange,
  handleSubmit,
  handleUsernameChange,
  password,
  username,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
export default LoginForm;
