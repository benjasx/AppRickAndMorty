import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

// Define cuántos números de página quieres ver en total (incluyendo el actual)
const MAX_PAGES_TO_SHOW = 7;
// Esto se traduce en, por ejemplo, 1 2 3 4 5 6 7. Si hay elipsis, es 1 ... 4 5 6 ... 100

/**
 * Genera el array de números de página y elipsis ("...") para el truncado.
 * Mantiene la página 1 y la totalPages visibles, y un rango centrado.
 */
const getPaginationRange = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const range: (number | string)[] = [];

  if (totalPages <= MAX_PAGES_TO_SHOW) {
    // Si hay pocas páginas, mostramos todas
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  // Número de páginas adyacentes a mostrar (ej: 2)
  const adjacentPages = Math.floor((MAX_PAGES_TO_SHOW - 3) / 2); // -3 por P1, Elipsis, PTotal

  const startRange = Math.max(2, currentPage - adjacentPages);
  const endRange = Math.min(totalPages - 1, currentPage + adjacentPages);

  // 1. Añadir la página 1
  range.push(1);

  // 2. Añadir elipsis inicial
  if (startRange > 2) {
    range.push("...");
  } else if (startRange === 2) {
    range.push(2);
  }

  // 3. Añadir el rango de páginas centrado
  for (let i = startRange; i <= endRange; i++) {
    if (i !== 1 && i !== totalPages) {
      // Evitar duplicar 1 y totalPages
      range.push(i);
    }
  }

  // 4. Añadir elipsis final
  if (endRange < totalPages - 1) {
    range.push("...");
  } else if (endRange === totalPages - 1) {
    range.push(totalPages - 1);
  }

  // 5. Añadir la última página
  if (totalPages > 1) {
    range.push(totalPages);
  }

  // Limpiar duplicados si se solapan los rangos (ej: si totalPages es pequeño o rango muy grande)
  return Array.from(new Set(range));
};

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";
  const page = isNaN(+queryPage) ? 1 : +queryPage;

  // 💡 Generar el rango de páginas truncado
  const pages = getPaginationRange(page, totalPages);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  return (
    // Agregamos `overflow-x-auto p-2` para manejo móvil y centrado
    <div className="flex items-center justify-center space-x-2 overflow-x-auto p-2">
      {/* Botón Anterior */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {/* Botones de Páginas y Elipsis */}
      {pages.map((p, index) => {
        const uniqueKey = `page-${p}-${index}`;
        if (p === "...") {
          return (
            <span
              key={uniqueKey}
              className="px-2 text-gray-500 flex items-center h-9"
            >
              ...
            </span>
          );
        }

        const pageNumber = p as number;

        return (
          <Button
            key={pageNumber}
            variant={page === pageNumber ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Botón Siguiente */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages} // Corregido: se inhabilita en la última página
        onClick={() => handlePageChange(page + 1)}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
