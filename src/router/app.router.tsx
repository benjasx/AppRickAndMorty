import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";

import { HomeAdminPage } from "@/admin/pages/home/HomeAdminPage";
import { CharacterPage } from "@/characters/pages/character/CharacterPage";
import { HomePage } from "@/characters/pages/home/HomePage";
import { CharacterLayout } from "@/characters/layouts/CharacterLayout";

const SearchPage = lazy(() => import("@/characters/pages/search/SearchPage"));

//export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: "/",
    element: <CharacterLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "character/:id",
        element: <CharacterPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
  {
    path: "admin",
    element: <HomeAdminPage />,
  },
]);
