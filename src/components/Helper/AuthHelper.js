import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";

export const AuthHelper = (children) => {
  const { loggedIn, account } = useAppSelector(state => state.auth)
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    } else {
      navigate('auth/login')
    }
  }, [loggedIn]);

  return (
    <>
    </>
  )
}