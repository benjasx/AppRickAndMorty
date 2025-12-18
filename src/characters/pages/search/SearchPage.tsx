import { CharactersStatus } from "@/characters/components/CharactersStatus";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { SearchControls } from "./ui/SearchControls";
import { HeroGrid } from "@/characters/components/CharactersGrid";
import { useQuery } from "@tanstack/react-query";
import { searchCharactersActions } from "@/characters/actions/Search-chraracers.action";
import { useSearchParams } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const species = searchParams.get("species") ?? undefined;
  const gender = searchParams.get("gender") ?? undefined;
  const page = Number(searchParams.get("page")) ?? 1;

  const { data } = useQuery({
    queryKey: ["search", { name, page, status, species, gender }],
    queryFn: () =>
      searchCharactersActions({ name, page, status, species, gender }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const charactersToShow = data?.results ?? [];

  return (
    <>
      <CustomJumbotrom
        title="Busca tus personajes"
        description="Utiliza la nueva funcionalidad de filtros integrados: by <Benjasx98>"
      />
      <CharactersStatus />
      <SearchControls />
      <HeroGrid characters={charactersToShow} />
      {data?.info.pages ? (
        <CustomPagination totalPages={data?.info.pages ?? 1} />
      ) : (
        <h2 className="text-gray-400 font-black text-center">
          No hay personajes filtrados para mostar
        </h2>
      )}
    </>
  );
};

export default SearchPage;
