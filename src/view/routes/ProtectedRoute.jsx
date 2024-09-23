import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const { accessToken, user } = useSelector((state) => state.auth);
  
    if (!accessToken) {
      return <Navigate to="/login" replace />;
    }
  
    return element;
  };

export default ProtectedRoute;