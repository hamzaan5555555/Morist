import {Link, Outlet, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, USER_DASHBOARD_ROUTE} from "../../router/index.jsx";
import {useEffect, useState} from "react";
import {axiosClient} from "../../api/axios.js";
                    

export default function Logout() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
      navigate(LOGIN_ROUTE)
    }
	
    axiosClient.post('/logout').then(({data}) => {
		window.localStorage.removeItem('ACCESS_TOKEN');
		window.localStorage.removeItem('TYPE_COMPTE');
      navigate(LOGIN_ROUTE)
    })
  }, []);
  
  return <>
  </>
}