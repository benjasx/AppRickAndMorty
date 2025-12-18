import type { CharacterRespopnse } from "@/types/get-characters.response";
import { RickAndMortyApi } from "../api/Characters.Api";

export const getCharactersByPage = async (
  page: number,
  limit: number,
  species: string = "all"
): Promise<CharacterRespopnse> => {
  if (isNaN(page)) {
    page = 1;
  }

  const { data } = await RickAndMortyApi.get<CharacterRespopnse>("/character", {
    params: {
      limit: limit,
      page: page,
      species: species,
    },
  });
  const characters = data.results.map((char) => ({
    ...char,
  }));

  return {
    ...data,
    results: characters,
  };
};
