import { createBrowserRouter } from "react-router";
import LandingPage from "./features/landing/pages/LandingPage";
import SignUpPages from "./features/auth/pages/SignUpPages";
import SignInPages from "./features/auth/pages/SignInPages";

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
]);

export default router;
