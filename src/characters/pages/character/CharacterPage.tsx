import { getCharacterByID } from "@/characters/actions/get-characterByID.Action";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Activity, Calendar, Globe, MapPin, Tv, User } from "lucide-react";
import { Navigate, useParams } from "react-router";

export const CharacterPage = () => {
  const { id = "" } = useParams();

  const { data, isError } = useQuery({
    queryKey: ["characterByID", id],
    queryFn: () => getCharacterByID(id),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isError) {
    return <Navigate to={"/"} />;
  }

  if (!data) {
    return <h2>Cargando....</h2>;
  }

  const createdDate = new Date(data.created).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Principal */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          {/* Columna Imagen */}
          <div className="w-full md:w-1/3">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-auto object-cover"
              />
              <div
                className={`absolute top-4 right-4 px-4 py-1 rounded-full text-white font-bold text-sm shadow-lg ${
                  data.status === "Alive"
                    ? "bg-green-500"
                    : data.status === "Dead"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {data.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Columna Información Principal */}
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-2">
                {data.name}
              </h1>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="text-md px-3 py-1 gap-1">
                  <User size={16} /> {data.gender}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-md px-3 py-1 gap-1 border-blue-200 bg-blue-50"
                >
                  <Activity size={16} /> {data.species}
                </Badge>
                {data.type && (
                  <Badge variant="outline" className="text-md px-3 py-1 gap-1">
                    {data.type}
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Origen */}
              <Card className="bg-white/60 backdrop-blur">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Origen</p>
                    <p className="text-lg font-bold text-gray-800">
                      {data.origin.name}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Ubicación Actual */}
              <Card className="bg-white/60 backdrop-blur">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Ubicación Actual
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {data.location.name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center gap-2 text-gray-500 bg-white p-3 rounded-lg border">
              <Calendar size={18} />
              <span className="text-sm text-gray-400">Registrado el: </span>
              <span className="text-sm font-semibold">{createdDate}</span>
            </div>
          </div>
        </div>

        {/* Sección de Episodios */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <Tv className="text-purple-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">
              Apariciones en Episodios ({data.episode.length})
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
