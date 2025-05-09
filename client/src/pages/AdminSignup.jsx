import React, { useState } from "react";

export default function AdminSignup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("https://course-selling-fullstack-application.onrender.com/admin/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(data.message || "Signup failed");
  }

  return (
    <form onSubmit={handleSubmit} className="item">
      <h2>Admin Signup</h2>
      <input
        placeholder="First Name"
        value={form.firstname}
        onChange={(e) => setForm((f) => ({ ...f, firstname: e.target.value }))}
      />
      <br />
      <input
        placeholder="Last Name"
        value={form.lastname}
        onChange={(e) => setForm((f) => ({ ...f, lastname: e.target.value }))}
      />
      <br />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
      />
      <br />
      <button type="submit">Sign Up</button>
      <div>{msg}</div>
    </form>
  );
}
