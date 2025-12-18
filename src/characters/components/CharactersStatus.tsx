import { Heart, ShieldPlus, ShieldX, User } from "lucide-react";
import { CharactersStatCard } from "./CharactersStatCard";
import { Badge } from "@/components/ui/badge";
import {
  useCharacterInfoAliens,
  useCharacterInfoAlive,
  useCharacterInfoDead,
  useCharacterInfoHuman,
  useCharactersInfoResponse,
} from "../hooks/useCharactersInfoResponse";
import { use } from "react";
import { FavoritesCharactersContext } from "@/context/FavoritesCharacters";

export const CharactersStatus = () => {
  const { data: CharactersResponse } = useCharactersInfoResponse();
  const { data: infoAlive } = useCharacterInfoAlive();
  const { data: infoDead } = useCharacterInfoDead();
  const { data: infoHuman } = useCharacterInfoHuman();
  const { data: infoAlien } = useCharacterInfoAliens();
  const { favoriteCount } = use(FavoritesCharactersContext);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <CharactersStatCard
        title="Total de personajes"
        icon={<User className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl text-center font-bold">
          {CharactersResponse?.info.count}
        </div>
        <div className="flex gap-1 mt-2">
          <Badge variant={"secondary"} className="text-xs">
            {infoHuman?.info.count} Humanos
          </Badge>
          <Badge variant={"destructive"} className="text-xs">
            {infoAlien?.info.count} Aliens
          </Badge>
        </div>
      </CharactersStatCard>

      <CharactersStatCard
        title="Mis Favoritos"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl text-center font-bold">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground mt-2">
          {(
            (favoriteCount / (CharactersResponse?.info.count ?? 1)) *
            100
          ).toFixed(2)}{" "}
          % of total ({CharactersResponse?.info.count})
        </p>
      </CharactersStatCard>
      <CharactersStatCard
        title="Personajes Vivos"
        icon={<ShieldPlus className="h-5 w-5 text-muted-foreground" />}
      >
        <div className="text-2xl text-center font-bold">
          {infoAlive?.info.count}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {(
            ((infoAlive?.info.count ?? 0) /
              (CharactersResponse?.info.count ?? 1)) *
            100
          ).toFixed(2)}{" "}
          % of total ({CharactersResponse?.info.count ?? 0})
        </p>
      </CharactersStatCard>
      <CharactersStatCard
        title="Personajes Muertos"
        icon={<ShieldX className="h-5 w-5 text-muted-foreground" />}
      >
        <div className="text-2xl text-center font-bold">
          {infoDead?.info.count}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {(
            ((infoDead?.info.count ?? 0) /
              (CharactersResponse?.info.count ?? 1)) *
            100
          ).toFixed(2)}{" "}
          % of total ({CharactersResponse?.info.count ?? 0})
        </p>
      </CharactersStatCard>
    </div>
  );
};
