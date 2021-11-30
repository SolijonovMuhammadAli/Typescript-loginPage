import React, { ReactElement, useState } from "react";
import {
  AuthForm,
  AuthWrapper,
  FormWrapper,
  VioletField,
} from "./Auth.components";
import { onLogin } from "./auth.api";
import { Link, useNavigation } from "react-navi";

export default function LoginPage(): ReactElement {
  const [{ username, password }, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, token } = await onLogin({
      username,
      password,
    });
    setError("");

    if (error) {
      setError(error);
    } else {
      navigation.setContext({ token });
      navigation.navigate("/");
    }
  };
  return (
    <AuthWrapper>
      <VioletField>
        <FormWrapper>
          <AuthForm onSubmit={login}>
            <label htmlFor="username">Username</label>
            <input
              placeholder="Username"
              value={username}
              name="username"
              onChange={(e) =>
                setCredentials({
                  username: e.target.value,
                  password,
                })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) =>
                setCredentials({
                  username,
                  password: e.target.value,
                })
              }
            />
            <button type="submit">Login</button>
            {error.length > 0 && <p>{error}</p>}
            <p>
              Need an account? <Link href="/register">Register</Link>
            </p>
          </AuthForm>
        </FormWrapper>
      </VioletField>
    </AuthWrapper>
  );
}
