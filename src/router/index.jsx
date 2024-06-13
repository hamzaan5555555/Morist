import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/compenment/notfound/NotFound.jsx";
import Layout from "@/layouts/Layout.jsx";
import Hero from "@/compenment/Hero/Hero.jsx";
import Login from "@/compenment/Login/Login.jsx";
import Register from "@/compenment/Register/Register.jsx";
import Contact from '../compenment/Contact/contact.jsx'
export const LOGIN_ROUTE = '/login'
export const USER_DASHBOARD_ROUTE = '/user'

import GuestLayout from "../layouts/GuestLayout.jsx";
import UserDashboardLayout from "../layouts/User/UserDashboardLayout.jsx";
import UserProfile from "../compenment/UserProfile/UserProfile.jsx";

import Explore from "../compenment/Explore/Explore.jsx";
import About from "../compenment/About/About.jsx";
import Terms from "../compenment/Terms/Terms.jsx";
import PrivacyPolicy from "../compenment/PrivacyPolicy/PrivacyPolicy.jsx";
import Faqs from "../compenment/Faqs/Faqs.jsx";
import Offre from "../compenment/Offre/Offre.jsx";
import Panier from "../compenment/Panier/Panier.jsx";
import Search from "../compenment/Search/Search.jsx";

import StarredOffres from "../compenment/StarredOffres/StarredOffres.jsx";
import UserOffers from "../compenment/UserOffers/UserOffers.jsx";
import AjoutOffre from "../compenment/AjoutOffre/AjoutOffre.jsx";
import EditOffre from "../compenment/EditOffre/EditOffre.jsx";
import EditUser from "../compenment/EditUser/EditUser.jsx";
import Logout from "../compenment/Logout/Logout.jsx";
import ReserveOffre from "../compenment/ReserveOffre/ReserveOffre.jsx";
import GuideDashboard from "../compenment/GuideDashboard/GuideDashboard.jsx";
import TouristDashboard from "../compenment/TouristDashboard/TouristDashboard.jsx";
import ContactUser from "../compenment/ContactUser/ContactUser.jsx";
export const router = createBrowserRouter([



  {
	  element: <Layout/>,
	  children: [
		{
			path: '/',
			element: <Hero/>
		},
        {
            path: '/contact',
            element: <Contact/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/faqs',
            element: <Faqs/>
        },
        {
            path: '/terms',
            element: <Terms/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/privacyPolicy',
            element: <PrivacyPolicy/>
        },
        {
            path: '/explore',
            element: <Explore/>
        },
        {
            path: '/explore/:city',
            element: <Explore/>
        },
        {
            path: '/offre/:id',
            element: <Offre/>
        },
		{
			path: '/user/:id',
			element: <UserProfile/>
		},
		{
			path: '/userOffers/:user',
			element: <UserOffers/>
		},
        {
            path: '/panier',
            element: <Panier/>
        },
        {
            path: '/search/:q',
            element: <Search/>
        },
		{
			path: '*',
			element: <NotFound/>
		}
	  ]
  },
  {
	  element: <GuestLayout/>,
	  children: [
		{
			path: LOGIN_ROUTE,
			element: <Login/>
		},
		{
			path: '/register',
			element: <Register/>
		}
	  ]
  },
  {
	  element: <UserDashboardLayout/>,
	  children: [
		{
			path: USER_DASHBOARD_ROUTE,
			element: <UserProfile/>
		},
		{
			path: '/GuideDashboard',
			element: <GuideDashboard/>
		},
		{
			path: '/TouristDashboard',
			element: <TouristDashboard/>
		},
		{
			path: '/userOffers',
			element: <UserOffers/>
		},
		{
			path: '/ajoutOffre',
			element: <AjoutOffre/>
		},
		{
			path: '/editOffre/:id',
			element: <EditOffre/>
		},
		{
			path: '/editUser',
			element: <EditUser/>
		},
		{
			path: '/logout',
			element: <Logout/>
		},
		{
			path: '/user',
			element: <UserProfile/>
		},
		{
			path: '/starredOffres',
			element: <StarredOffres/>
		},
		{
			path: '/reserveOffre/:id',
			element: <ReserveOffre/>
		},
		{
			path: '/ContactUser/:id',
			element: <ContactUser/>
		}
	  ]
  }

]);
