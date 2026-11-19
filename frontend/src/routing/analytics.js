import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import AnalyticsPage from "../pages/AnalyticsPage";
import { checkAuth } from "../utils/helper";

export const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/analytics",
  component: AnalyticsPage,
  beforeLoad: checkAuth,
});
