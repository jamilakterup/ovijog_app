import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  
    return element;
  };

export default ProtectedRoute;