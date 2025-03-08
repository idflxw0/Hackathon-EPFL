import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/LandingPage";
import ChatPage from "@/pages/ChatPage";
import SignIn from "@/pages/auth/SignIn";
import EnterCode from "@/pages/auth/EnterCode";
import Documentation from "@/pages/LandingPage/Documentation";
import Privacy from "@/pages/LandingPage/Privacy";
import Terms from "@/pages/LandingPage/Terms";
import Contact from "@/pages/LandingPage/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/enter-code",
    element: <EnterCode />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);
