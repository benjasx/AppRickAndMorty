import type { CharacterRespopnse } from "@/types/get-characters.response";
import { RickAndMortyApi } from "../api/Characters.Api";

interface Options {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: number;
}

export const searchCharactersActions = async (opciones: Options = {}) => {
  const { name, status, species, gender, page } = opciones;

  if (!name && !status && !species && !gender && !page) {
    return {
      results: [],
      info: { count: 0, pages: 0, next: "", prev: null },
    };
  }

  const { data } = await RickAndMortyApi.get<CharacterRespopnse>("/character", {
    params: {
      name,
      status,
      species,
      gender,
      page,
    },
  });

  return data;
};
