import { createBrowserRouter } from "react-router";
import LandingPage from "./features/landing/pages/LandingPage";
import SignUpPages from "./features/auth/pages/SignUpPages";
import SignInPages from "./features/auth/pages/SignInPages";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import UpdatePasswordPage from "./features/auth/pages/UpdatePasswordPage";
import LayoutPage from "./shared/components/LayoutPage";
import DiscoverPage from "./features/discover/pages/DiscoverPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPages />,
  },
  {
    path: "/sign-in",
    element: <SignInPages />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <UpdatePasswordPage />,
  },
  {
    path: "/home",
    element: <LayoutPage />,
    children: [
      {
        path: "discover",
        element: <DiscoverPage />,
      },
    ],
  },
]);

export default router;
