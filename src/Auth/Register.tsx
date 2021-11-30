import React, { useState } from "react";
import { AuthForm } from "./Auth.components";
import { onRegister } from "./auth.api";
import { Link } from "react-navi";

export default function Register(): React.ReactElement {
  const [{ username, password, repeatPassword }, setRegister] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState("");
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const response = await onRegister({
        username,
        password,
      });
      setError("");
      if (response && response.error) {
        setError(response.error);
      }
    } else {
      setError("Password and Repeat password must math");
    }
  };
  return (
    <AuthForm onSubmit={register}>
      <label htmlFor="username">Username</label>
      <input
        placeholder="Username"
        value={username}
        name="username"
        onChange={(e) =>
          setRegister({
            username: e.target.value,
            password,
            repeatPassword,
          })
        }
      />
      <label htmlFor="password">Password</label>
      <input
        placeholder="Password"
        value={password}
        name="password"
        onChange={(e) =>
          setRegister({
            username,
            password: e.target.value,
            repeatPassword,
          })
        }
      />

      <label htmlFor="repeatpassword">Repeat Password</label>
      <input
        placeholder="Repeat Password"
        value={repeatPassword}
        name="repeatpassword"
        onChange={(e) =>
          setRegister({
            username,
            password,
            repeatPassword: e.target.value,
          })
        }
      />
      <button type="submit">Register</button>
      {error.length > 0 && <p>{error}</p>}
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </AuthForm>
  );
}
