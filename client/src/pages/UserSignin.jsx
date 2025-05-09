import React, { useState, useEffect } from "react";

export default function UserSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMsg("Email and password are required");
      return;
    }

    setIsLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userToken", data.token);
        setIsSignedIn(true);
        setMsg("Signed in successfully!");
        setEmail("");
        setPassword("");
      } else {
        setMsg(
          data.message || "Sign-in failed. Please check your credentials."
        );
      }
    } catch (error) {
      setMsg("Connection error. Please try again later.");
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSignout() {
    localStorage.removeItem("userToken");
    setIsSignedIn(false);
    setMsg("Signed out successfully!");
  }

  return (
    <form onSubmit={handleSubmit} className="item">
      <h2>User Signin</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading || isSignedIn}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading || isSignedIn}
      />
      <br />
      {!isSignedIn ? (
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      ) : (
        <button type="button" onClick={handleSignout}>
          Sign Out
        </button>
      )}
      <div>{msg}</div>
    </form>
  );
}
