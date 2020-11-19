<template>
    <section class="container testRoboto mt-8 pt-9 text24 is-12by8 is-justify-content-center containers containers-is-grid">
    <div v-if="formErrors" class="container">
    <p class="has-text-centered is-size-7 text-is-red is-normal">Invalid Credentials</p>
    </div>
    <form class="form container centered" @submit.prevent action="">
    <!--field-->
    <div class="field mb-2 ">
    <div class="control has-icons-left">
    <input class="input" v-model="userDetails.userEmail" type="email" placeholder="enter your email">
    <span class="icon is-small is-left">
       <i class="fas fa-envelope"></i>
    </span>
    </div>
    </div>
    <!--field-->
    <div class="field mb-2 ">
    <div class="control has-icons-left">
    <input class="input" type="password" v-model="userDetails.userPassword" placeholder="enter password">
    <span class="icon is-small is-left">
       <i class="fas fa-eye-slash"></i>
    </span>
    </div>
    </div>
    <div @click="verify_user"  class="button  mb-8 ui">
      Sign In
    </div>
    <div v-show="submitLoading" class="isWidth400 isHeigt450 container button is-loading"></div>
    </form>
  </section>
</template>
<script>
import * as fb from '@/firebase'
export default {
    name: "signIn",
    data(){
        return{
            userDetails:{
                userEmail: "",
                userPassword: "",
            },
            formErrors: false,
            submitLoading: false
        }
    },
    methods:{
        async verify_user(){
            this.submitLoading = true
            if(this.userDetails.userEmail !=="" || this.userDetails.userPassword !=="" ){
                await fb.auth.signInWithEmailAndPassword(this.userDetails.userEmail, this.userDetails.userPassword).then(
                    console.log("submitted")
                ).then((userN)=>{
                    console.log(userN)
                        this.$router.push({name: 'admin-dash', params:{user_uid: `${userN.user.uid}`}})
                    }
                ).catch((e)=>{
                    console.log(e)
                })
            }else{
                this.formErrors = true
            }        
        }
    }
}
</script>