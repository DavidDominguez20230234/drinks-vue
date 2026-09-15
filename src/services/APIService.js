import api from "../lib/axios";

export default {
  obtenerCategorias() {
    return api("/list.php?c=list");
  },
  obtenerListaAlcoholica() {
    return api("/list.php?a=list");
  },
  obtenerListaVasos() {
    return api("/list.php?g=list");
  },
  buscarPorNombreOIngrediente(nombre) {
    return api(`/filter.php?i=${nombre}`);
  },
  buscarPorCategoria(categoria) {
    return api(`/filter.php?c=${categoria}`);
  },
  buscarPorAlcohol(alcoholica) {
    return api(`/filter.php?a=${alcoholica}`);
  },
  buscarPorVaso(vaso) {
    return api(`/filter.php?g=${vaso}`);
  },
  buscarReceta(id) {
    return api(`/lookup.php?i=${id}`);
  },
  buscarAleatoria() {
    return api("/random.php");
  },
};
