import useHttp from "@/services/useHttp";

export const pokemonService = {
  getAll: async () => {
    try {
      const res = await useHttp.get("?limit=151");
      return res.data.results;
    } catch (error) {
      console.log("Erro ao obter pokemons", error);
      throw error;
    }
  },
};

export default pokemonService;
