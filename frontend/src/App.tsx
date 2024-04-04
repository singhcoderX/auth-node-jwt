type Props = {};
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = (props: Props) => {
  return <RouterProvider router={router} />;
};

export default App;
