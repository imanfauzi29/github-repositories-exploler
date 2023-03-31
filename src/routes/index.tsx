import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => {
  const routerPath = [
    {
      path: "/",
      element: <Home />
    }
  ];

  return (
    <Routes>
      {routerPath.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Routes>
  );
};

export default Router;
