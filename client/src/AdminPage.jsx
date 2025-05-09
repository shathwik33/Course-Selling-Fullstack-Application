import { Routes, Route, Link } from "react-router-dom";
import AdminSignin from "./pages/AdminSignin";
import AdminSignup from "./pages/AdminSignup";
import Courses from "./pages/Courses";
import AdminCourses from "./pages/AdminCourses";

export default function AdminPage() {
  return (
    <div className="body">
      <nav>
        <Link to="/" className="nav-link">
          Courses
        </Link>{" "}
        |
        <Link to="/admin/signin" className="nav-link">
          Admin Signin
        </Link>{" "}
        |{" "}
        <Link to="/admin/signup" className="nav-link">
          Admin Signup
        </Link>{" "}
        |{" "}
        <Link to="/admin/courses" className="nav-link">
          Admin Courses
        </Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
        </Routes>
      </div>
    </div>
  );
}
