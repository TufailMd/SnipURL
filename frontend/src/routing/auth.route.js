import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import AuthPage from "../pages/AuthPage";

export const authPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});
