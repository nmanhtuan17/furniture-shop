import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getCarts, getCategory, getProducts} from "../../redux/actions/app.action";

export const AuthHelper = (children) => {
  const { loggedIn, account } = useAppSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(getProducts())
      dispatch(getCategory())
      dispatch(getCarts())
    }
  }, [])
  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate('/')
  //   } else {
  //     navigate('auth/login')
  //   }
  // }, [loggedIn]);

  return (
    <>
    </>
  )
}
