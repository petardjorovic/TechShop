import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtect({ children }) {
  const { user } = useSelector((state) => state.userStore);
  return user.role === "admin" ? children : <Navigate to={"/"} />;
}

export default AdminProtect;
