import type { CharacterRespopnse } from "@/types/get-characters.response";
import { RickAndMortyApi } from "../api/Characters.Api";

export const getCharactersInfo = async (): Promise<CharacterRespopnse> => {
  const { data } = await RickAndMortyApi.get<CharacterRespopnse>("/character");
  const characters = data.results.map((char) => ({
    ...char,
  }));

  return {
    ...data,
    results: characters,
  };
};
