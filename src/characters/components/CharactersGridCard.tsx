import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FavoritesCharactersContext } from "@/context/FavoritesCharacters";
import type { Characters } from "@/types/get-characters.response";
import { Globe, MapPin, Heart, User, Aperture } from "lucide-react"; // Íconos para atributos
import { use } from "react";
import { useNavigate } from "react-router";

interface Props {
  character: Characters;
}

// Función auxiliar para determinar el color basado en el status
const getStatusClasses = (status: string) => {
  switch (status) {
    case "Alive":
    case "Alive": // Duplicado de seguridad si usas el Enum o el string
      return "bg-green-500";
    case "Dead":
    case "Dead":
      return "bg-red-500";
    default: // Unknown
      return "bg-gray-500";
  }
};

export const CharactersGridCard = ({ character }: Props) => {
  // Clases dinámicas para el status (ej: 'bg-green-500')
  const statusColor = getStatusClasses(character.status.toString());
  const navigate = useNavigate();

  // Determinar ícono y texto para el género (opcional, basado en tu diseño)
  const genderIcon =
    character.gender === "Female" ? (
      <User className="w-4 h-4 text-pink-500" />
    ) : character.gender === "Male" ? (
      <User className="w-4 h-4 text-blue-500" />
    ) : (
      <User className="w-4 h-4 text-gray-500" />
    );

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  const { isfavorite, toggleFavorites } = use(FavoritesCharactersContext);
  return (
    // Aplica bordes redondeados y sombra suave como en el diseño.
    <Card className="p-0 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      {/* SECCIÓN DE IMAGEN */}
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full object-cover aspect-square cursor-pointer"
          onClick={handleClick}
        />

        {/* Etiqueta de Status (Esquina Superior Derecha) */}
        <div
          className={`absolute top-2 right-2 flex items-center p-1 px-2 rounded-full text-xs font-bold text-white shadow  ${statusColor}`}
        >
          {character.status}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white"
          onClick={() => toggleFavorites(character)}
        >
          <Heart
            className={`h-4 w-4 ${
              isfavorite(character)
                ? "fill-red-500 text-red-500"
                : "fill-grey-500 text-grey-500"
            }`}
          />
        </Button>
      </div>

      {/* SECCIÓN DE DETALLES */}
      <div className="p-4 pt-0 space-y-3">
        {/* 1. Nombre */}
        <h1 className="font-extrabold text-2xl text-gray-800 leading-tight">
          {character.name}
        </h1>

        {/* 2. Género y Especie (Fila 1) */}
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          {/* Género */}
          <div className="flex items-center gap-1">
            {genderIcon}
            <span>{character.gender}</span>
          </div>
          {/* Especie */}
          <div className="flex items-center gap-1">
            <Aperture className="w-4 h-4 text-gray-400" />
            <span>{character.species}</span>
          </div>
        </div>

        <hr className="my-2 border-gray-100" />

        {/* 3. Origen */}
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <Globe className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold block leading-none">Origen:</span>
            <span>{character.origin.name}</span>
          </div>
        </div>

        {/* 4. Última Ubicación */}
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <MapPin className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold block leading-none">
              Última Ubicación:
            </span>
            <span>{character.location.name}</span>
          </div>
        </div>

        {/* 5. Tipo (si existe) */}
        {character.type && (
          <div className="flex items-start gap-2 text-xs text-gray-500 pt-2">
            <span className="font-medium">Tipo:</span>
            <span className="italic">{character.type}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
