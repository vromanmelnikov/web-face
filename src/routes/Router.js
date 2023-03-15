import { lazy } from "react";
import { Navigate } from "react-router-dom";

/*****Routes******/

let AdminAuthContainer = lazy(() => import('../components/views/AdminAuth/AdminAuth.container'))
let LoginContainer = lazy(() => import('../components/views/AdminAuth/Login/Login.container'))
let RegistrationContainer = lazy(() => import('../components/views/AdminAuth/Registration/Registration.container'))

let AdminSystemContainer = lazy(() => import('../components/views/AdminSystem/AdminSystem.container'))
let InfoContainer = lazy(() => import('../components/views/AdminSystem/Info/Info.container'))
let StreamDetectionContainer = lazy(()=>import('../components/views/AdminSystem/StreamDetection/StreamDetection.container'))
let UnknownInfoContainer = lazy(() => import('../components/views/AdminSystem/UnknownInfo/UnknownInfo.container'))
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
        path: "/admin/info",
        element: <InfoContainer />
      },
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
      },
      {
        path: '/admin/unknown-info/:index',
        element: <UnknownInfoContainer />
      }
    ]
  }
];

export default ThemeRoutes;
