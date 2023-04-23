import { defineStore } from "pinia";
import { getHomeHotSuggests, getCategories } from "@/services";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getCategories()
      this.categories = res.data
    }
  }
})

export default useHomeStore