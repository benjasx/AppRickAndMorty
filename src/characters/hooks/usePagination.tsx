import { useQuery } from "@tanstack/react-query";
import { getCharactersByPage } from "../actions/get-characters-by-page.action";

export const usePagination = (
  page: number,
  limit: number,
  species: string = ""
) => {
  return useQuery({
    queryKey: ["charactersp", { page, limit, species }],
    queryFn: () => getCharactersByPage(+page, +limit, species),
    staleTime: 1000 * 60 * 5,
  });
};
