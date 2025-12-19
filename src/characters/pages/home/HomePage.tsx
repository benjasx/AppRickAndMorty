import { use, useMemo } from "react";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/characters/components/CharactersGrid";
import { CharactersStatus } from "@/characters/components/CharactersStatus";
import { usePagination } from "@/characters/hooks/usePagination";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoritesCharactersContext } from "@/context/FavoritesCharacters";
export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const species = searchParams.get("species") ?? "";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favoritos", "human", "alien"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: CharactersResponse } = usePagination(+page, +limit, species);
  const { favorites } = use(FavoritesCharactersContext);
  return (
    <>
      <CustomJumbotrom
        title="Encuentra tus divertidos personajes"
        description="Explora esta App para ver a tus personajes de Rick And Morty"
      />
      <p className="text-gray-400 text-center mb-7 ">By: Benjasx98</p>
      <CharactersStatus />
      <Tabs value={selectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="all"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "all");
                prev.set("species", "");
                prev.set("page", "1");
                return prev;
              })
            }
          >
            Todos
          </TabsTrigger>
          <TabsTrigger
            value="favoritos"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "favoritos");
                return prev;
              })
            }
          >
            Favorios
          </TabsTrigger>
          <TabsTrigger
            value="human"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "human");
                prev.set("species", "human");
                prev.set("page", "1");
                return prev;
              })
            }
          >
            Humanos
          </TabsTrigger>
          <TabsTrigger
            value="alien"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "alien");
                prev.set("species", "alien");
                prev.set("page", "1");
                return prev;
              })
            }
          >
            Aliens
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <HeroGrid characters={CharactersResponse?.results ?? []} />
        </TabsContent>
        <TabsContent value="favoritos">
          {favorites.length === 0 ? (
            <h2 className="text-center mt-5 text-gray-400 text-xl">
              No hay personajes favoritos, te recomiendo marcar a (Rick Sánchez)
            </h2>
          ) : (
            <HeroGrid characters={favorites} />
          )}
        </TabsContent>
        <TabsContent value="human">
          {" "}
          <HeroGrid characters={CharactersResponse?.results ?? []} />
        </TabsContent>
        <TabsContent value="alien">
          {" "}
          <HeroGrid characters={CharactersResponse?.results ?? []} />
        </TabsContent>
      </Tabs>

      {selectedTab !== "favoritos" && (
        <CustomPagination totalPages={CharactersResponse?.info.pages ?? 1} />
      )}
    </>
  );
};
