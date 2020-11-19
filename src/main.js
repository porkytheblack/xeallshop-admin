import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bulma from 'bulma'
import {auth} from '@/firebase'
let app 
auth.onAuthStateChanged(function(user){
    if(!app){
        createApp(App).use(bulma).use(store).use(router).mount('#app')
    }
    if(user){
        store.dispatch('toDash')
    }
})
