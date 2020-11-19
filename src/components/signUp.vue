<template>
  <section class="container testRoboto mt-8 pt-9 text24 is-12by8 is-justify-content-center containers containers-is-grid">
    <div v-if="formErrors" class="container">
    <p class="has-text-centered is-size-7 text-is-red is-normal">Invalid Credentials</p>
    </div>
    <form class="form container centered" @submit.prevent action="">
    <!--field-->
    <div class="field mb-2 mt-4">
    <div class="control has-icons-left">
    <input class="input" v-model.trim="userDetails.username" type="text" placeholder="enter a username">
    <span class="icon is-small is-left">
       <i class="fas fa-user"></i>
    </span>
    </div>
    </div>
    <!--field-->
    <div class="field mb-2 ">
    <div class="control has-icons-left">
    <input class="input" v-model="userDetails.email" type="email" placeholder="enter a valid email">
    <span class="icon is-small is-left">
       <i class="fas fa-envelope"></i>
    </span>
    </div>
    </div>
    <!--field-->
    <div class="field mb-2 ">
    <div class="control has-icons-left">
    <input class="input" type="password" v-model="userDetails.password" placeholder="enter a password">
    <span class="icon is-small is-left">
       <i class="fas fa-eye-slash"></i>
    </span>
    </div>
    </div>
    <!--field-->
    <div class="field mb-2 ">
    <div class="control has-icons-left">
    <input class="input" type="password" v-model="repassword" placeholder="re-enter password">
    <span class="icon is-small is-left">
       <i class="fas fa-eye-slash"></i>
    </span>
    </div>
    </div>
    <div @click="verify_entries"  class="button  mb-8 ui">
      Submit
    </div>
    <div v-show="submitLoading" class="isWidth400 isHeigt450 container button is-loading"></div>
    </form>
  </section>
</template>
<script>
import * as fb from '@/firebase.js'
export default {
  name: 'signUp',
  data(){
    return{
      repassword: "",
      userDetails:{
        username: "",
        email: "",
        password: "",
      },
      formErrors: false,
      submitLoading: false
    }
  },
  methods:{
    async verify_entries(){
      this.submitLoading=true
      if(this.userDetails.username == "" || this.userDetails.email =="" || this.userDetails.password == "" || this.repassword == ""){
        this.formErrors = true,
        this.submitLoading = false
      }
      const newUserRef = await fb.auth.createUserWithEmailAndPassword(this.userDetails.email, this.userDetails.password)
      console.log(newUserRef.user.uid)
      await fb.usersCollection.doc(newUserRef.user.uid).set({
        UserName: this.userDetails.username,
        UserPriviledge: "superUser",
        uid: newUserRef.user.uid,
        about: "",
        category: "",
        photoUrl: ""
      }).then(
        this.$router.push({
          name: 'signin'
        }).catch((e)=>[
          console.log(e)
        ])
      )
    }
  }
}
</script>>
<style scoped>

</style>