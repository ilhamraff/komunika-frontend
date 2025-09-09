import { createBrowserRouter, redirect } from "react-router";
import LandingPage from "./features/landing/pages/LandingPage";
import SignUpPages from "./features/auth/pages/SignUpPages";
import SignInPages from "./features/auth/pages/SignInPages";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import UpdatePasswordPage from "./features/auth/pages/UpdatePasswordPage";
import LayoutPage from "./shared/components/LayoutPage";
import DiscoverPage from "./features/discover/pages/DiscoverPage";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "./shared/utils/constant";
import DetailGroupPage from "./features/discover/pages/DetailGroupPage";
import SuccessPaymentPage from "./features/transactions/pages/SuccessPaymentPage";
import ChatPage from "./features/chat/pages/ChatPage";
import SettingPage from "./features/setting/pages/SettingPage";
import AccountPage from "./features/setting/pages/AccountPage";
import GroupsPage from "./features/setting/pages/GroupsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-up",
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);

      if (auth) {
        throw redirect("/home/discover");
      }

      return true;
    },
    element: <SignUpPages />,
  },
  {
    path: "/sign-in",
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);

      if (auth) {
        throw redirect("/home/discover");
      }

      return true;
    },
    element: <SignInPages />,
  },
  {
    path: "/forgot-password",
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);

      if (auth) {
        throw redirect("/home/discover");
      }

      return true;
    },
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);

      if (auth) {
        throw redirect("/home/discover");
      }

      return true;
    },
    element: <UpdatePasswordPage />,
  },
  {
    path: "/success-payment",
    element: <SuccessPaymentPage />,
  },
  {
    path: "/home/chats",
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);

      if (!auth) {
        throw redirect("/sign-in");
      }

      return auth;
    },
    element: <ChatPage />,
  },
  {
    path: "/home/settings",
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);

      if (!auth) {
        throw redirect("/sign-in");
      }

      return auth;
    },
    children: [
      {
        index: true,
        element: <SettingPage />,
      },
      {
        path: "/home/settings/account",
        element: <AccountPage />,
      },
      {
        path: "/home/settings/groups",
        element: <GroupsPage />,
      },
    ],
  },
  {
    path: "/home",
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);

      if (!auth) {
        throw redirect("/sign-in");
      }

      return true;
    },
    element: <LayoutPage />,
    children: [
      {
        path: "discover",
        element: <DiscoverPage />,
      },
      {
        path: "discover/group/:groupId",
        element: <DetailGroupPage />,
      },
    ],
  },
]);

export default router;
