import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

import { HomeAdminPage } from "@/admin/pages/home/HomeAdminPage";
import { CharacterPage } from "@/characters/pages/character/CharacterPage";
import { HomePage } from "@/characters/pages/home/HomePage";
import { CharacterLayout } from "@/characters/layouts/CharacterLayout";

const SearchPage = lazy(() => import("@/characters/pages/search/SearchPage"));

export const appRouter = createBrowserRouter([
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
