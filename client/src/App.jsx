import React, { useState } from "react";  
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

export default function App() {
  const [page, setPage] = useState(null);

  if (page === "user") {
    return <UserPage />;
  }
  if (page === "admin") {
    return <AdminPage />;
  }

  return (
    <div className="container" style={{ flexDirection: "column" }}>
      <button
        onClick={() => setPage("user")}
        className="nav-link"
        // style={{ margin: 20 }}
      >
        User Page
      </button>
      <button
        onClick={() => setPage("admin")}
        className="nav-link"
        // style={{ margin: 20 }}
      >
        Admin Page
      </button>
    </div>
  );
}
