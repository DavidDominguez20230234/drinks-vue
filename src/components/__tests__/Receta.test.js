import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import Receta from "@/components/Receta.vue";

describe("Receta.vue", () => {
  const receta = {
    idDrink: "11007",
    strDrink: "Margarita",
    strDrinkThumb: "https://example.com/margarita.jpg",
  };

  it("muestra el nombre y la imagen de la receta", () => {
    const wrapper = mount(Receta, {
      props: { receta },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });

    expect(wrapper.text()).toContain("Margarita");
    expect(wrapper.find("img").attributes("src")).toBe(receta.strDrinkThumb);
  });

  it("enlaza a la ruta de detalle de la receta", () => {
    const wrapper = mount(Receta, {
      props: { receta },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: "receta",
      params: { id: "11007" },
    });
  });
});
