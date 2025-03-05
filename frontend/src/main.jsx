import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

//*redux
import { Provider } from "react-redux";
import store from "./store/store.js";

//* pages
import ShopPage from "./pages/Shop/ShopPage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import AuthorizationPage from "./pages/Authorization/AuthorizationPage.jsx";

//* router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ShopPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/authorization",
        element: <AuthorizationPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
