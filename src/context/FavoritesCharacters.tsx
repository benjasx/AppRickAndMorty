import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Characters } from "../types/get-characters.response";

interface FavoritesCharactersContext {
  //State
  favorites: Characters[];
  favoriteCount: number;

  //Methods
  isfavorite: (character: Characters) => boolean;
  toggleFavorites: (character: Characters) => void;
}

export const FavoritesCharactersContext = createContext(
  {} as FavoritesCharactersContext
);

const getFavoritesFromLocalStorage = (): Characters[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteCharacterProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Characters[]>(
    getFavoritesFromLocalStorage
  );

  const toggleFavorite = (character: Characters) => {
    // Validar si el personaje existe en el estado actual
    const characterExist = favorites.find((c) => c.id === character.id);

    // Si el personaje existe retorna el areglo sin el personaje con ese ID
    if (characterExist) {
      setFavorites(favorites.filter((c) => c.id !== character.id));
      return;
    }

    // Si no existe lo agrega
    setFavorites([...favorites, character]);
  };

  // cada que el estado de favorios cambie se guarda en el localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesCharactersContext
      value={{
        //state
        favoriteCount: favorites.length,
        favorites: favorites,

        // methods
        isfavorite: (character: Characters) =>
          favorites.some((c) => c.id === character.id),
        toggleFavorites: toggleFavorite,
      }}
    >
      {children}
    </FavoritesCharactersContext>
  );
};
