import { Routes, Route, Link } from "react-router-dom";
import UserSignin from "./pages/UserSignin";
import UserSignup from "./pages/UserSignup";
import Courses from "./pages/Courses";
import Purchases from "./pages/Purchases";

export default function UserPage() {
  return (
    <div className="body">
      <nav>
        <Link to="/" className="nav-link">
          Courses
        </Link>
        |
        <Link to="/user/signin" className="nav-link">
          User Signin
        </Link>
        |
        <Link to="/user/signup" className="nav-link">
          User Signup
        </Link>
        |
        <Link to="/user/purchases" className="nav-link">
          Purchases
        </Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/purchases" element={<Purchases />} />
        </Routes>
      </div>
    </div>
  );
}
