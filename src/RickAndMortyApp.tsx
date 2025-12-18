import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoriteCharacterProvider } from "./context/FavoritesCharacters";
const queryClient = new QueryClient();

export const RickAndMortyApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteCharacterProvider>
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </FavoriteCharacterProvider>
    </QueryClientProvider>
  );
};
