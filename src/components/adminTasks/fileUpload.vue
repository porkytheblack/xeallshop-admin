<template>
    <section class="container mb-4 is-centered">
    <figure class="image is-128x128">
        <img :src="image_url" alt="">
    </figure>
    <div class="file is-boxed has-name">
    <label class="file-label">
    <input @change="newImage" ref="input1" type="file" class="file-input">
    <span class="file-cta"><span class="file-icon">choose file...<i class="icon fax4 fa fa-upload"></i></span></span>
    </label>
    </div>
    </section>
    <section v-if="uploadValue < 100 && uploadValue>5">
        <p> {{uploadValue}} </p>
        <progress class="progress is-success" :val="uploadValue" max="100"></progress>
    </section>
</template>
<script>
import firebase from 'firebase'
export default {
    name: 'addImage',
    data(){
        return{
        image_url: "",
        uploadValue: 0,
        caption: '',
        fileData: null
        }
    },
    methods:{
        click1(){
            this.$refs.input1.click()
        },
        newImage(event){
            this.image_url = null,
            this.uploadvalue = 0,
            this.fileData = event.target.files[0],

            this.uploadToStorage()
        },
        newImageRef(){
            this.$emit("newimageref", {
                image_url: this.image_url
            })
        },
        sendToStore(){
            this.$store.dispatch('prodFile', this.image_url)
        },
        async uploadToStorage(){
            this.image_url = null;
      const storageRef = firebase.storage().ref(`${this.fileData.name}`).put(this.fileData);
      storageRef.on(`state_changed`, snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue = 100;
      storageRef.snapshot.ref.getDownloadURL().then((url)=>{
        this.image_url = url;
        console.log(this.image_url)
        this.$store.dispatch('prodFile', this.image_url)
      })
    }
  )

        }
    }
}
</script>