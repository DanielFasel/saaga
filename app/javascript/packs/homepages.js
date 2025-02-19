//extention
import Vue from 'vue'
import Vuex from 'vuex'
// load vuex i18n module
import vuexI18n from 'vuex-i18n'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Smooth ScrollTo
import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})


//Vuex
import {
  store
} from './apps/homepage/homepage_store/homepage_store.js'

import vMediaQuery from 'v-media-query'
Vue.use(vMediaQuery)

// Axios and default settings
import axios from 'axios'
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

Vue.prototype.$http = axios


//components
import HomepageMainpage from './apps/homepage/homepage_pages/homepage_mainpage.vue'
import Homepage from './apps/homepage/homepage_pages/homepage/homepage.vue'
import WhatIsIt from './apps/homepage/homepage_pages/what_is_it/what_is_it.vue'
import AsAStudent from './apps/homepage/homepage_pages/as_a_student/as_a_student.vue'
import AsATeacher from './apps/homepage/homepage_pages/as_a_teacher/as_a_teacher.vue'
import AsASchool from './apps/homepage/homepage_pages/as_a_school/as_a_school.vue'
import Contact from './apps/homepage/homepage_pages/contact/contact.vue'
import Help from './apps/homepage/homepage_pages/help/help.vue'
import SiteMap from './apps/homepage/homepage_pages/site_map/site_map.vue'
import TermsOfUse from './apps/homepage/homepage_pages/terms_of_use/terms_of_use.vue'
import PrivacyNotice from './apps/homepage/homepage_pages/privacy_notice/privacy_notice.vue'

import HomepageMenu from './apps/homepage/homepage_pages/homepage_helpers/homepage_menu/homepage_menu.vue'
import HomepageDrawer from './apps/homepage/homepage_pages/homepage_helpers/homepage_menu/homepage_drawer.vue'
import HomepageMenuSide from './apps/homepage/homepage_pages/homepage_helpers/homepage_menu/homepage_menu_side.vue'
import HomepageFooter from './apps/homepage/homepage_pages/homepage_helpers/homepage_footer/homepage_footer.vue'


Vue.use(vuexI18n.plugin, store)

// Fetching of languages so it can be displayed before moutning the instance
// Reads and extracts the local variable from the url
var url = window.location.pathname
var local = url.substring(1, 3)
//requires the language json file according to the local
var json =  require( "./assets/languages/live/homepage/homepage_"+local+".json")
// commits the language to Vuex
Vue.i18n.add(local, json)
Vue.i18n.set(local)




//imported component to be used on all the SPA
Vue.component('homepage-menu-side', HomepageMenuSide)
Vue.component('homepage-menu', HomepageMenu)
Vue.component('homepage-footer', HomepageFooter)
Vue.component('homepage-drawer', HomepageDrawer)


//routing
const routes = [
  {path: '/', component: Homepage},
  {path: '/what', component: WhatIsIt},
  {path: '/as_student', component: AsAStudent},
  {path: '/as_teacher', component: AsATeacher},
  {path: '/as_school', component: AsASchool},
  {path: '/contact', component: Contact},
  {path: '/help', component: Help},
  {path: '/site_map', component: SiteMap},
  {path: '/terms', component: TermsOfUse},
  {path: '/privacy', component: PrivacyNotice}
]

const router = new VueRouter({
  mode: 'history',
  routes
})


//default component
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('hello'))
    const app = new Vue({
      el: 'hello',
      store,
      router,
      template: '<homepage-mainpage/>',
      components: {
        HomepageMainpage
      }

  })
})
