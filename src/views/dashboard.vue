<template>
    <section class="containers is-full-width isHeight600">
    <div class="card containers is-full-width columns containers-is-flex">





<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
      <img src="https://bulma.io/images/bulma-logo.png" alt="admin-xeall-shop " width="112" height="28">
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a @click="backHome()" class="navbar-item">
        Home
      </a>
      <a @click="signOut()" class="navbar-item">
        Sign Out
      </a>
    </div>
  </div>
</nav>












    </div>

    <div v-if="loading" class="container is-full-width">
        <ring-loader :size="'800'"></ring-loader>
    </div>
    <section v-if="!loading" class="columns container mt-4 mb-4 mr-3 is-full-width">
    <div class="container column-is-mobile  column card is-pulled-left is-one-quarter isHeight isHeight700 containers isFixed isZed10 ">
    <dashLink class="continers isHeight500 isWidth300"/>
    </div>
    <div class="column is-three-quarter is-pulled-right ">
    <router-view>
    </router-view>
    </div>
    </section>
    </section>
</template>
<script>
import dashLink from '@/components/dashProps/dashLink.vue'
import RingLoader from "vue-spinner/src/RingLoader"
import * as fb from '@/firebase.js'
export default {
    name: 'dashboard',
    data(){
        return{
            loading: true
        }
    },
    components:{
        dashLink,
        RingLoader
    },
    methods:{
        signOut(){
            fb.auth.signOut
            this.$router.push('/signin')
        },
        backHome(){
            this.$router.push({name: "admin-dash"})
        },
        initPage(){
            this.$router.push({name: "admin-dash"})
            setTimeout(()=>{
                this.loading = false
            }, 5000)
        }
    },
    created(){
        this.initPage()
    }
}
</script>>