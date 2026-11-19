import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import DashboardPage from "../pages/DashboardPage";
import { checkAuth } from "../utils/helper";

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
  beforeLoad: checkAuth,
});
