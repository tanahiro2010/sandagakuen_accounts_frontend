import type { AppRoute } from "../types/router"
import App from "../app/Home"
import AuthCallback from "../app/AuthCallback"
import Login from "../app/Login"

const routes: AppRoute[] = [
  {
    path: "/",
    type: "page",
    element: <App />,
  },
  {
    path: "/_auth/callback",
    type: "page",
    element: <AuthCallback />,
  },
  {
    path: "/_auth/login",
    type: "page",
    element: <Login />,
  }
]

export { routes }
