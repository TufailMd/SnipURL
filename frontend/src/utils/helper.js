import { redirect } from "@tanstack/react-router";
import { getCurrentUser, refreshUserTokens } from "../api/user.api";

import { login } from "../app/slice/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;

    await refreshUserTokens();

    const response = await queryClient.fetchQuery({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
      staleTime: 0,
    });

    store.dispatch(login(response.user));

    return true;
  } catch (error) {
    console.log("Authentication failed:", error.response?.data);

    return redirect({ to: "/auth" });
  }
};
