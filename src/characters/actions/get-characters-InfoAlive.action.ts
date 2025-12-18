import type { CharacterRespopnse } from "@/types/get-characters.response";
import { RickAndMortyApi } from "../api/Characters.Api";

export const getCharactersInfoAlive = async (): Promise<CharacterRespopnse> => {
  const { data } = await RickAndMortyApi.get<CharacterRespopnse>(
    "/character/?status=alive"
  );
  const characters = data.results.map((char) => ({
    ...char,
  }));

  return {
    ...data,
    results: characters,
  };
};
