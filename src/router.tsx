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
import GroupDetailPage from "./features/setting/pages/GroupDetailPage";
import CreateGroupPage from "./features/setting/pages/CreateGroupPage";
import { getGroup } from "./features/setting/api/getGroup";
import RevenuePage from "./features/revenue/pages/RevenuePage";
import WithdrawPage from "./features/revenue/pages/WithdrawPage";

const requireAuth = () => {
  const auth = secureLocalStorage.getItem(AUTH_KEY);
  if (!auth) throw redirect("/sign-in");
  return auth;
};

const guestOnly = () => {
  const auth = secureLocalStorage.getItem(AUTH_KEY);
  if (auth) throw redirect("/home/discover");
  return true;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-up",
    loader: guestOnly,
    element: <SignUpPages />,
  },
  {
    path: "/sign-in",
    loader: guestOnly,
    element: <SignInPages />,
  },
  {
    path: "/forgot-password",
    loader: guestOnly,
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    loader: guestOnly,
    element: <UpdatePasswordPage />,
  },
  {
    path: "/success-payment",
    element: <SuccessPaymentPage />,
  },
  {
    path: "/home/chats",
    loader: requireAuth,
    element: <ChatPage />,
  },
  {
    path: "/home/settings",
    loader: requireAuth,
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
      {
        path: "/home/settings/groups/:id",
        element: <GroupDetailPage />,
      },
      {
        path: "/home/settings/create-group",
        element: <CreateGroupPage />,
      },
      {
        path: "/home/settings/groups/edit/:id",
        loader: async ({ params }) => {
          const group = await getGroup(params?.id ?? "");

          return group.data;
        },
        element: <CreateGroupPage />,
      },
    ],
  },
  {
    path: "/home/revenue",
    loader: requireAuth,
    children: [
      {
        index: true,
        element: <RevenuePage />,
      },
    ],
  },
  {
    path: "/home/revenue/withdraw",
    loader: requireAuth,
    children: [
      {
        index: true,
        element: <WithdrawPage />,
      },
    ],
  },
  {
    path: "/home",
    loader: requireAuth,
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
