import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import store from "./Store.js";
import { Provider } from "react-redux";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./screens/AdminLogin.jsx";
import AdminHome from "./screens/AdminHome.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminEditProfile from "./components/AdminEditProfile.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<LoginScreen />,
//   },

//   {
//     path: "/register",
//     element: <RegisterScreen />,
//   },
//   {
//     path: "",
//     element: <PrivateRoute />,
//     children: [
//       {
//         path: "/profile",
//         element: <ProfileScreen />,
//       },
//       {
//         path: "/home",
//         element: <HomeScreen />,
//       },
//     ],
//   },

//   // Admin Side
//   {
//     path: "/adminLogin",
//     element: <AdminLogin />,
//   },
//   {
//     path: "",
//     element: <AdminRoute />,
//     children: [
//       {
//         path: "/adminDashboard",
//         element:<AdminHome />,
//       },
//       {
//         path: "/adminEditProfile/:userId",
//         element:<AdminEditProfile />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<HomeScreen />}></Route>

        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="/adminLogin" element={<AdminLogin />}></Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/adminDashboard" element={<AdminHome />}></Route>
        <Route
          path="/adminEditProfile/:userId"
          element={<AdminEditProfile />}
        ></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
