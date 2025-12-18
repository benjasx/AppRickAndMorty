import type { Characters } from "@/types/get-characters.response";
import { CharactersGridCard } from "./CharactersGridCard";

interface Props {
  characters: Characters[];
}
export const HeroGrid = ({ characters }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 pt-5">
      {characters.map((character) => (
        <CharactersGridCard key={character.id} character={character} />
      ))}
    </div>
  );
};
