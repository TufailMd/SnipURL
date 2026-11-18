import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./root.route";
import DashboardPage from "../pages/DashboardPage";
import { checkAuth } from "../utils/helper";

export const dashboardPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  beforeLoad: checkAuth,
});
