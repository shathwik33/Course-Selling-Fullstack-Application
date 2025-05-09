import React, { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/course/preview")
      .then((res) => res.json())
      .then(setCourses);
  }, []);

  async function purchase(courseId) {
    setMsg("");
    const token = localStorage.getItem("userToken");
    if (!token) {
      setMsg("Sign in as user to purchase");
      return;
    }
    const res = await fetch("http://localhost:3000/course/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ courseId }),
    });
    const data = await res.json();
    setMsg(data.message || "Purchase failed");
  }

  return (
    <div className="item">
      <h2>Courses</h2>
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
          <button onClick={() => purchase(c._id)}>Purchase</button>
        </div>
      ))}
      <div>{msg}</div>
    </div>
  );
}
