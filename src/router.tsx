import { createBrowserRouter, redirect } from "react-router";
import LandingPage from "./features/landing/pages/LandingPage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import SignInPage from "./features/auth/pages/SignInPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import UpdatePasswordPage from "./features/auth/pages/UpdatePassword";
import LayoutPage from "./shared/components/LayoutPage";
import DiscoverPage from "./features/discover/pages/DiscoverPage";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "./shared/utils/constant";
import DetailGroupPage from "./features/discover/pages/DetailGroupPage";

const requireAuthLoader = () => {
  const auth = secureLocalStorage.getItem(AUTH_KEY);
  if (!auth) {
    throw redirect("/sign-in");
  }
  return true;
};

const requireNoAuthLoader = () => {
  const auth = secureLocalStorage.getItem(AUTH_KEY);
  if (auth) {
    throw redirect("/home/discover");
  }
  return true;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    loader: requireNoAuthLoader,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
    loader: requireNoAuthLoader,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
    loader: requireNoAuthLoader,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    loader: requireNoAuthLoader,
  },
  {
    path: "/forgot-password/:token",
    element: <UpdatePasswordPage />,
    loader: requireNoAuthLoader,
  },
  {
    path: "/home",
    loader: requireAuthLoader,
    element: <LayoutPage />,
    children: [
      {
        path: "/home/discover",
        element: <DiscoverPage />,
        loader: requireAuthLoader,
      },
      {
        path: "/home/discover/group/:id",
        element: <DetailGroupPage />,
        loader: requireAuthLoader,
      }
    ]
  }
]);

export default router;
