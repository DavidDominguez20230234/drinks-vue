import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useBebidasStore } from "@/stores/bebidas";
import APIService from "@/services/APIService";

vi.mock("@/services/APIService", () => ({
  default: {
    obtenerCategorias: vi.fn().mockResolvedValue({ data: { drinks: [] } }),
    obtenerListaAlcoholica: vi
      .fn()
      .mockResolvedValue({ data: { drinks: [] } }),
    obtenerListaVasos: vi.fn().mockResolvedValue({ data: { drinks: [] } }),
    buscarPorNombreOIngrediente: vi.fn(),
    buscarPorCategoria: vi.fn(),
    buscarPorAlcohol: vi.fn(),
    buscarPorVaso: vi.fn(),
    buscarReceta: vi.fn(),
    buscarAleatoria: vi.fn(),
  },
}));

describe("bebidas store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("intersecta los resultados cuando se combinan varios criterios", async () => {
    const bebidas = useBebidasStore();
    bebidas.busqueda.categoria = "Cocktail";
    bebidas.busqueda.alcoholica = "Alcoholic";

    APIService.buscarPorCategoria.mockResolvedValue({
      data: { drinks: [{ idDrink: "1" }, { idDrink: "2" }, { idDrink: "3" }] },
    });
    APIService.buscarPorAlcohol.mockResolvedValue({
      data: { drinks: [{ idDrink: "2" }, { idDrink: "3" }, { idDrink: "4" }] },
    });

    await bebidas.obtenerRecetas();

    expect(bebidas.recetas.map((r) => r.idDrink).sort()).toEqual([
      "2",
      "3",
    ]);
    expect(bebidas.cargando).toBe(false);
    expect(bebidas.error).toBe(false);
  });

  it("solo llama a la API de los criterios que el usuario definió", async () => {
    const bebidas = useBebidasStore();
    bebidas.busqueda.nombre = "vodka";

    APIService.buscarPorNombreOIngrediente.mockResolvedValue({
      data: { drinks: [{ idDrink: "5" }] },
    });

    await bebidas.obtenerRecetas();

    expect(APIService.buscarPorNombreOIngrediente).toHaveBeenCalledWith(
      "vodka"
    );
    expect(APIService.buscarPorCategoria).not.toHaveBeenCalled();
    expect(APIService.buscarPorAlcohol).not.toHaveBeenCalled();
    expect(APIService.buscarPorVaso).not.toHaveBeenCalled();
    expect(bebidas.recetas).toEqual([{ idDrink: "5" }]);
  });

  it("marca error y limpia resultados si la búsqueda falla", async () => {
    const bebidas = useBebidasStore();
    bebidas.busqueda.nombre = "vodka";
    APIService.buscarPorNombreOIngrediente.mockRejectedValue(
      new Error("network error")
    );

    await bebidas.obtenerRecetas();

    expect(bebidas.error).toBe(true);
    expect(bebidas.recetas).toEqual([]);
    expect(bebidas.cargando).toBe(false);
  });
});
