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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);
      if (auth) {
        throw redirect("/home/discover");
      }
      return true;
    },
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);
      if (auth) {
        throw redirect("/home/discover");
      }
      return true;
    },
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);
      if (auth) {
        throw redirect("/home/discover");
      }
      return true;
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);
      if (auth) {
        throw redirect("/home/discover");
      }
      return true;
    },
  },
  {
    path: "/forgot-password/:token",
    element: <UpdatePasswordPage />,
    loader: () => {
      const auth = secureLocalStorage.getItem(AUTH_KEY);
      if (auth) {
        throw redirect("/home/discover");
      }
      return true;
    },
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
        path: "/home/discover",
        element: <DiscoverPage />,
        loader: () => {
          const auth = secureLocalStorage.getItem(AUTH_KEY);
          if (!auth) {
            throw redirect("/sign-in");
          }
          return true;
        },
      }
    ]
  }
]);

export default router;
