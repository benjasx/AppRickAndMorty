import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@radix-ui/react-accordion";

export const SearchControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeAccordion = searchParams.get("active-accordion") ?? "";
  const status = searchParams.get("status") ?? "";
  const species = searchParams.get("species") ?? "";
  const gender = searchParams.get("gender") ?? "";

  const setQueryParams = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef.current?.value ?? "";
      setQueryParams("name", value);
    }
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const inputName = event.target.id;
    setSearchParams((prev) => {
      if (value === "") {
        prev.delete(inputName);
      } else {
        prev.set(inputName, value);
        prev.set("page", "1");
      }
      return prev;
    });
  };

  const handleClear = () => {
    setSearchParams({});
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            placeholder="Buscar por nombre: Morty, Summer, Rick..."
            className="bg-white pl-12 h-12 text-lg"
            onKeyDown={handleKeyDown}
            defaultValue={searchParams.get("name") ?? ""}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant={
              activeAccordion === "advance-filters" ? "default" : "outline"
            }
            className="h-12"
            onClick={() => {
              if (activeAccordion === "advance-filters") {
                setQueryParams("active-accordion", "");
                return;
              }

              setQueryParams("active-accordion", "advance-filters");
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" className="h-12">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort by Name
          </Button>

          <Button variant="outline" className="h-12">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Add Character
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible value={activeAccordion}>
        <AccordionItem value="advance-filters">
          <AccordionContent>
            <AccordionContent>
              <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Advanced Filters</h3>
                  <Button variant="destructive" onClick={handleClear}>
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estatus</label>
                    <select
                      name="status"
                      id="status"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      onChange={handleTeamChange}
                      defaultValue={status}
                    >
                      <option value="">Si filtro</option>
                      <option value="alive">Con Vida</option>
                      <option value="dead">Muertos</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Especies</label>
                    <select
                      name="species"
                      id="species"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={species}
                      onChange={handleTeamChange}
                    >
                      <option value="">Sin filtro</option>
                      <option value="Human">Humanos</option>
                      <option value="Alien">Aliens</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Generos</label>
                    <select
                      name="gender"
                      id="gender"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={gender}
                      onChange={handleTeamChange}
                    >
                      <option value="">Sin filtro</option>
                      <option value="male">Masculino</option>
                      <option value="female">Femenino</option>
                    </select>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
