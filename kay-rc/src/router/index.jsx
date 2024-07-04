/** @format */

import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Welcome from "../layout/Welcome";
import Home from "../pages/overview/Home";
import Dashboard from "../pages/overview/components/Dashboard";
import Tasks from "../pages/overview/components/Tasks";
import Projects from "../pages/overview/components/Projects";
import TaskEdit from "../pages/overview/components/components/TaskEdit";
import TaskAdd from "../pages/overview/components/components/TaskAdd";
import UserAdd from "../pages/overview/components/components/UserAdd";
import Users from "../pages/overview/components/Users";
import UserEdit from "../pages/overview/components/components/UserEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            index: true,
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "tasks/:id/edit",
            element: <TaskEdit />,
          },
          {
            path: "tasks/add-task",
            element: <TaskAdd />,
          },
          {
            path:"users",
            element:<Users/>
          },
          {
            path: "users/:id/edit",
            element: <UserEdit />,
          },
        ],
      },
      {
        path: "*",
        element: <p>Page not found</p>,
      },
    ],
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  // {
  //   path: "/sign-up",
  //   element: <Signup />,
  // },
]);
