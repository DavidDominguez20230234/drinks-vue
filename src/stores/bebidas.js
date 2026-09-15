import { ref, reactive, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";
import { useNotificacionStore } from "./notificaciones";

export const useBebidasStore = defineStore("bebidas", () => {
  const notificaciones = useNotificacionStore();

  const categorias = ref([]);
  const alcoholicas = ref([]);
  const vasos = ref([]);

  const busqueda = reactive({
    nombre: "",
    categoria: "",
    alcoholica: "",
    vaso: "",
  });

  const recetas = ref([]);
  const receta = ref({});

  const cargando = ref(false);
  const cargandoReceta = ref(false);
  const error = ref(false);

  onMounted(async function () {
    try {
      const [{ data: catData }, { data: alcData }, { data: vasoData }] =
        await Promise.all([
          APIService.obtenerCategorias(),
          APIService.obtenerListaAlcoholica(),
          APIService.obtenerListaVasos(),
        ]);
      categorias.value = catData.drinks;
      alcoholicas.value = alcData.drinks;
      vasos.value = vasoData.drinks;
    } catch (e) {
      notificaciones.$patch({
        texto: "No se pudieron cargar los filtros de búsqueda",
        mostrar: true,
        error: true,
      });
    }
  });

  function interseccionPorIdDrink(listas) {
    const [primera, ...resto] = listas;
    if (!primera) return [];
    return primera.filter((drink) =>
      resto.every((lista) =>
        lista.some((otro) => otro.idDrink === drink.idDrink)
      )
    );
  }

  async function obtenerRecetas() {
    cargando.value = true;
    error.value = false;

    try {
      const busquedas = [];
      if (busqueda.nombre) {
        busquedas.push(APIService.buscarPorNombreOIngrediente(busqueda.nombre));
      }
      if (busqueda.categoria) {
        busquedas.push(APIService.buscarPorCategoria(busqueda.categoria));
      }
      if (busqueda.alcoholica) {
        busquedas.push(APIService.buscarPorAlcohol(busqueda.alcoholica));
      }
      if (busqueda.vaso) {
        busquedas.push(APIService.buscarPorVaso(busqueda.vaso));
      }

      const respuestas = await Promise.all(busquedas);
      const listas = respuestas.map(({ data }) => data.drinks ?? []);

      recetas.value = interseccionPorIdDrink(listas);
    } catch (e) {
      error.value = true;
      recetas.value = [];
      notificaciones.$patch({
        texto: "Ocurrió un error al buscar recetas. Intenta de nuevo",
        mostrar: true,
        error: true,
      });
    } finally {
      cargando.value = false;
    }
  }

  async function cargarReceta(id) {
    cargandoReceta.value = true;
    error.value = false;
    receta.value = {};

    try {
      const {
        data: { drinks },
      } = await APIService.buscarReceta(id);
      receta.value = drinks?.[0] ?? null;
    } catch (e) {
      error.value = true;
      receta.value = null;
      notificaciones.$patch({
        texto: "No se pudo cargar la receta solicitada",
        mostrar: true,
        error: true,
      });
    } finally {
      cargandoReceta.value = false;
    }
  }

  async function obtenerRecetaAleatoria() {
    try {
      const {
        data: { drinks },
      } = await APIService.buscarAleatoria();
      return drinks?.[0] ?? null;
    } catch (e) {
      notificaciones.$patch({
        texto: "No se pudo obtener una receta aleatoria",
        mostrar: true,
        error: true,
      });
      return null;
    }
  }

  const noRecetas = computed(() => recetas.value.length === 0);

  return {
    recetas,
    categorias,
    alcoholicas,
    vasos,
    busqueda,
    cargando,
    cargandoReceta,
    error,
    obtenerRecetas,
    cargarReceta,
    obtenerRecetaAleatoria,
    receta,
    noRecetas,
  };
});
