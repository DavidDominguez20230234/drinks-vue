import { describe, it, expect, beforeEach } from "vitest";
import { nextTick } from "vue";
import { setActivePinia, createPinia } from "pinia";
import { useFavoritosStore } from "@/stores/favoritos";
import { useBebidasStore } from "@/stores/bebidas";
import { useNotificacionStore } from "@/stores/notificaciones";

describe("favoritos store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("agrega la receta seleccionada a favoritos", async () => {
    const bebidas = useBebidasStore();
    const favoritos = useFavoritosStore();
    bebidas.receta = { idDrink: "11007", strDrink: "Margarita" };

    favoritos.handeClickFavorito();
    await nextTick();

    expect(favoritos.favoritos).toHaveLength(1);
    expect(favoritos.noFavoritos).toBe(false);
    expect(favoritos.existeFavorito()).toBe(true);
  });

  it("quita la receta de favoritos si ya estaba guardada", async () => {
    const bebidas = useBebidasStore();
    const favoritos = useFavoritosStore();
    bebidas.receta = { idDrink: "11007", strDrink: "Margarita" };

    favoritos.handeClickFavorito();
    await nextTick();
    favoritos.handeClickFavorito();
    await nextTick();

    expect(favoritos.favoritos).toHaveLength(0);
    expect(favoritos.noFavoritos).toBe(true);
    expect(favoritos.existeFavorito()).toBe(false);
  });

  it("notifica al usuario al agregar y al quitar", async () => {
    const bebidas = useBebidasStore();
    const favoritos = useFavoritosStore();
    const notificaciones = useNotificacionStore();
    bebidas.receta = { idDrink: "11007", strDrink: "Margarita" };

    favoritos.handeClickFavorito();
    await nextTick();
    expect(notificaciones.mostrar).toBe(true);
    expect(notificaciones.texto).toMatch(/agregó/i);

    favoritos.handeClickFavorito();
    await nextTick();
    expect(notificaciones.texto).toMatch(/eliminado/i);
  });
});
