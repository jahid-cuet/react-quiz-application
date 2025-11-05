// src/components/SignupForm.jsx
// useState → to store form data (like email, password, etc.)
// useNavigate → to move to another page after successful signup.
// useAuth() → comes from your AuthContext, which gives access to Firebase signup logic.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //   Get signup function from Auth Context.Firebase signup function defined in your AuthContext file.
  const { signup } = useAuth();

  //   This is used to redirect users after signup — for example, navigate("/") sends them to home
  const navigate = useNavigate();

  //   e.preventDefault() stops the page from reloading (normal browser behavior).
  async function handleSubmit(e) {
    e.preventDefault();

    // If passwords differ, show an error and stop further code.
    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    // If user didn’t tick the box, also stop and show error.
    if (!agree) {
      return setError("You must agree to the Terms & Conditions");
    }

    try {
      setError(""); //Remove previous error message.
      setLoading(true); //Set loading = true (disables submit button).
      await signup(email, password, username); //Call signup(email, password, username) → talks to Firebase.
      navigate("/"); //If success → go to homepage (/)
    } catch (err) {
      console.error(err);
      setError("Failed to create an account!"); //If fails → show “Failed to create account.
    } finally {
      setLoading(false); //Finally stop loading
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)} //When type in the box, it updates username state.
      />

      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        required
        text="I agree to the Terms & Conditions"
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
