import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLoggedIn } from "../redux/auth/authSlice";

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
const localAuth = getFromLocalStorage('auth')
console.log('local auth', localAuth)

const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!accessToken && localAuth) {
      dispatch(
        userLoggedIn({
          accessToken: localAuth?.accessToken,
          user: localAuth?.user,
        })
      );
    }
  }, [localAuth,accessToken,userLoggedIn])

  if (!accessToken && !localAuth) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;