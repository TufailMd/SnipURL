import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import LandingPage from "../pages/LandingPage";

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
