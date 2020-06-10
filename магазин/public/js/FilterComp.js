Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<form action="#" class="b-searchForm" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="b-searchForm__field" v-model="userSearch">
                <button type="submit" class="b-searchForm__btn">
                    <i class="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>`
})