import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import MyLinksPage from "../pages/MyLinksPage";
import { checkAuth } from "../utils/helper";

export const myLinksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/links",
  component: MyLinksPage,
  beforeLoad: checkAuth,
});
