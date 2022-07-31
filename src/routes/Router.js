import { lazy } from "react";
import { Navigate } from "react-router-dom";
// import UserInfoContainer from "../components/views/AdminSystem/UserInfo/UserInfo.container.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

let AdminAuthContainer = lazy(() => import('../components/views/AdminAuth/AdminAuth.container'))
let LoginContainer = lazy(() => import('../components/views/AdminAuth/Login/Login.container'))
let RegistrationContainer = lazy(() => import('../components/views/AdminAuth/Registration/Registration.container'))

let AdminSystemContainer = lazy(() => import('../components/views/AdminSystem/AdminSystem.container'))
let StreamDetectionContainer = lazy(()=>import('../components/views/AdminSystem/StreamDetection/StreamDetection.container'))
let UnknownListContainer = lazy(() => import('../components/views/AdminSystem/UnknownList/UnknownList.container'))
let UserListContainer = lazy(()=>import('../components/views/AdminSystem/UsersList/UserList.container'))
let UserInfoContainer = lazy(()=>import("../components/views/AdminSystem/UserInfo/UserInfo.container"))

// let SystemContainer = lazy(() => import('../components/views/System/System.container'))
let AuthContainer = lazy(() => import('../components/views/Auth/Auth.container'))
let UserAuthContainer = lazy(()=>import('../components/views/Auth/UserAuth/UserAuth.container'))

const ThemeRoutes = [
  {
    path: "/",
    element: <Navigate to='/admin-auth/login'/>
  },
  {
    path: "/auth",
    element: <AuthContainer />
  },
  {
    path: "/user-auth",
    element: <UserAuthContainer />
  },
  {
    path: "/admin-auth",
    element: <AdminAuthContainer />,
    children: [
      {
        path: "/admin-auth/login",
        element: <LoginContainer />,
      },
      {
        path: "/admin-auth/reg",
        element: <RegistrationContainer />,
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminSystemContainer />,
    children: [
      {
        path: '/admin/stream',
        element: <StreamDetectionContainer />
      },
      {
        path: "/admin/user-list",
        element: <UserListContainer />
      },
      {
        path: "/admin/unknown-list",
        element: <UnknownListContainer />
      },
      {
        path: "/admin/user-info/:index",
        element: <UserInfoContainer />
      }
    ]
  },
  {
    path: "/f",
    element: <FullLayout />,
    children: [

      { path: "/f/", element: <Navigate to="/starter" /> },
      { path: "/f/starter", exact: true, element: <Starter /> },
      { path: "/f/about", exact: true, element: <About /> },
      { path: "/f/alerts", exact: true, element: <Alerts /> },
      { path: "/f/badges", exact: true, element: <Badges /> },
      { path: "/f/buttons", exact: true, element: <Buttons /> },
      { path: "/f/cards", exact: true, element: <Cards /> },
      { path: "/f/grid", exact: true, element: <Grid /> },
      { path: "/f/table", exact: true, element: <Tables /> },
      { path: "/f/forms", exact: true, element: <Forms /> },
      { path: "/f/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
