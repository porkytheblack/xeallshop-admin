<template>
    <section class="container">
    <div v-if="!hasImage">
    <addImage/>
    </div>
    <div v-if="hasImage">
        <figure class="image is-128x128">
        <img :src="profileImage" alt="" class="is-rouded">
        </figure>
    </div>
    <div class="field controls container"><input v-model.trim="userDetails.email"  type="text" class="input disabled"></div>
    <textarea class="isWidth400 containers mb-4 field input" v-model.trim="userDetails.about" placeholder="enter about" name="" id="" cols="30" rows="360">
    </textarea>
    <div class="field controls mb-4 container"><input v-model.trim="userDetails.username" type="text" placeholder="enter username" class="input"></div>
    <div class="field controls mb-4 container"><input v-model.trim="userDetails.merchantId" type="text" class="input disabled"></div>
    <div class="field controls mb-4 container"><input v-model.trim="userDetails.category" type="text" placeholder="enter category" class="input"></div>
    <div @click="makeChanges()" class="button is-primary">
        submit changes
    </div>
    </section>
</template>
<script>
import addImage from '@/components/adminTasks/addImage.vue'
import * as fb from '@/firebase.js'
export default {
    name: 'editProfile',
    components:{
        addImage
    },
    data(){
        return{
            userDetails: {
                email: "",
                username: "",
                about: "",
                merchantId: "",
                category: ""
            },
            hasImage: false,
            profileImage: ""
        }
    },
    computed:{
        userImage(){
            return this.$store.state.newProdImage
        }
    },
    methods: {
        initProfile(){
            const currentAdmin = fb.auth.currentUser
            this.userDetails.email = currentAdmin.email
            this.hasUserImage()
        },
        async makeChanges(){
            this.userDetails.merchantId = await fb.auth.currentUser.uid
            console.log(fb.auth.currentUser)
            if(fb.usersCollection.doc)
            if(this.userDetails.category !== "" && this.userDetails.about !=="" && this.$store.state.newProdImage !== ""){
                await fb.usersCollection.doc(`${this.userDetails.merchantId}`).update({
                category: this.userDetails.category,
                about: this.userDetails.about,
                photoUrl: this.$store.state.newProdImage
            })
            }
        },
        async hasUserImage(){
            this.userDetails.merchantId = await fb.auth.currentUser.uid
            const currentU = await fb.usersCollection.doc(`${this.userDetails.merchantId}`)
            currentU.get().then((mData)=>{
                console.log(mData)
            })
        }
    },
    created(){
        this.initProfile()
    }
}
</script>