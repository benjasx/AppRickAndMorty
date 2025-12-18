import type { Characters } from "@/types/get-characters.response";
import { RickAndMortyApi } from "../api/Characters.Api";

export const getCharacterByID = async (id: string) => {
  const { data } = await RickAndMortyApi.get<Characters>(`character/${id}`);
  return {
    ...data,
  };
};
