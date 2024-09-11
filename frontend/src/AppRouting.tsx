import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./core/components/Login";
import Master from "./core/components/Master";
import NoPageFound from "./core/components/NoPageFound";
import { MenuLinks } from "./core/utility/constants/constants";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./projects/Projects";
import Tasks from "./tasks/Tasks";

const AppRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={MenuLinks.LOGIN} />} />
      <Route path={MenuLinks.LOGIN} element={<Login />} />
      <Route
        path={`/${MenuLinks.USERS}/${MenuLinks.USER_ID}/*`}
        element={<Master />}
      >
        <Route path={MenuLinks.DASHBOARD} element={<Dashboard />} />
        <Route path={MenuLinks.PROJECTS} element={<Projects />} />
        <Route
          path={`${MenuLinks.PROJECTS}/${MenuLinks.PROJECT_ID}/${MenuLinks.TASKS}`}
          element={<Tasks />}
        />
      </Route>

      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
};

export default AppRouting;
