import { createRoot } from "react-dom/client";
import "./index.css";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routing/routeTree.js";

import { store } from "./app/store.js";
import { Provider } from "react-redux";

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store,
  },
});

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
