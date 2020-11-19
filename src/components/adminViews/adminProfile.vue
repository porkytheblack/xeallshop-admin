<template>
    <section class="container is-centered containers-is-grid is-full-width">
    <div class="tile is-vertical is-parent is-centered">
        <div class="tile is-child is-center">
        <figure class="image is-128x128">
        <img class="is-rounded" :src="userDetails.userimage" alt="">
        </figure>
        </div>
        <div class="field label is-7 has-text-weight-bold textRoboto is-centered">
        {{userDetails.username}}
        </div>
        <div class="has-icons">
        <span @click="toProfile()">
        <i class="icon is-small fa fa-edit text-is-dc is-link is-centered">
        </i>
        </span>
        </div>
    </div>
    </section>
</template>
<script>
import * as fb  from '@/firebase.js'
export default {
    name: 'adminProfile',
    data(){
        return{
            userDetails:{
                username: "",
                userimage: "https://bulma.io/images/placeholders/128x128.png"
            }
        }
    },
    methods:{
        currentM(){
            const currentU = fb.auth.currentUser
            this.userDetails.username= currentU.email
            this.getImage()
            console.log(currentU)
        },
        toProfile(){
            this.$router.push({name: 'editProfile'})
        },
        getImage(){
            fb.usersCollection.where("uid", "==", fb.auth.currentUser.uid).onSnapshot((snapshot)=>{
                snapshot.forEach((doc)=>{
                    var cU = doc.data()
                    cU.id = doc.id
                    if(cU.photoUrl !== null){ 
                        this.userDetails.userimage = cU.photoUrl
                    }
                })
            })
        }
    },
    created(){
        this.currentM()
    }
}
</script>