import React, { useEffect, useState } from "react";

export default function Purchases() {
  const [courses, setCourses] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setMsg("Sign in as user to view purchases");
      return;
    }
    fetch("https://course-selling-fullstack-application.onrender.com/user/purchases", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
        else setMsg(data.message || "Failed to fetch");
      });
  }, []);

  return (
    <div className="item">
      <h2>My Purchases</h2>
      {courses.map((p) => (
        <div
          key={p._id}
          style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
        >
          <b>Course ID:</b> {p.courseId}
        </div>
      ))}
      <div>{msg}</div>
    </div>
  );
}
