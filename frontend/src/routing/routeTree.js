import { rootRoute } from "./root.route";

import { homePageRoute } from "./homepage";
import { authPageRoute } from "./auth.route";
import { dashboardPageRoute } from "./dashboard";
import { myLinksRoute } from "./my-links";
import { analyticsRoute } from "./analytics";

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authPageRoute,
  dashboardPageRoute,
  myLinksRoute,
  analyticsRoute,
]);
