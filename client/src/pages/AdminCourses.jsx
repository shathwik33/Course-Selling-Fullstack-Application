import React, { useEffect, useState } from "react";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    imageURL: "",
  });
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      setMsg("Sign in as admin to view courses");
      return;
    }
    fetch("https://course-selling-fullstack-application.onrender.com/admin/course/bulk", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCourses(data);
        else setMsg(data.message || "Failed to fetch");
      });
  }, [token]);

  async function handleCreate(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("https://course-selling-fullstack-application.onrender.com/admin/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    const data = await res.json();
    setMsg(data.message || "Failed to create");
  }

  return (
    <div className="item">
      <h2>Admin Courses</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
        <br />
        <input
          placeholder="Description"
          value={form.desc}
          onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
        />
        <br />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
        />
        <br />
        <input
          placeholder="Image URL"
          value={form.imageURL}
          onChange={(e) => setForm((f) => ({ ...f, imageURL: e.target.value }))}
        />
        <br />
        <button type="submit">Create Course</button>
      </form>
      <div>{msg}</div>
      <div>
        {courses.map((c) => (
          <div
            key={c._id}
            style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
          >
            <h3>{c.title}</h3>
            <img src={c.imageURL} alt={c.title} width={200} />
            <br />
            <b>Price:</b> ${c.price}
            <br />
            <b>Description:</b> {c.desc}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
