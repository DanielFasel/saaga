<template>

  <menu-side-mobile v-if="showMenuSide">
    Hello
  </menu-side-mobile>

</template>

<script>

import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

import MenuSideMobile from "../../../../../general_helpers/menus/menu_side_mobile/menu_side_mobile.vue"

export default{

  components: {
    "menu-side-mobile": MenuSideMobile
  },

  computed:{
    ...mapGetters('layout/modalDrawer',[
      'showMenuSide'
    ])
  }
}

</script>

<style scoped>
</style>
