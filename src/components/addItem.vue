<template>
    <section class="container is-full-width">
        <div class="tile is-parent is-verticle">
            <div class="tile is-child">
                <addImage @newimageref="newimageref"/>
                <fileUpload/>
                <itemDescriptors @descriptorsUpload="descriptorsUpload" />
                <div @click="addDescriptors()" class="button is-primary">
                submit
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import addImage from '@/components/adminTasks/addImage.vue'
import itemDescriptors from '@/components/adminTasks/itemDescriptors.vue'
import fileUpload from '@/components/adminTasks/fileUpload.vue'
import * as fb from '@/firebase.js'
export default {
    name: 'addItem',
    components:{
        addImage,
        itemDescriptors,
        fileUpload
    },
    data(){
        return{
            descriptors: {},
            newImage: "",
            merchantId: ""
        }
    },
    methods:{
        descriptorsUpload(newDescriptors){
            this.descriptors = newDescriptors
        },
        newimageref(newImage){
            console.log(newImage)
            this.newImage = newImage
        },
        async addDescriptors(){
            await this.getMID()
            const newData = await this.$store.state.descriptorsData
            const newFile = await this.$store.state.newProdFile
            console.log("data",newData)
            function getRandomString(length) {
                var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var result = '';
                for ( var i = 0; i < length; i++ ) {
                 result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                }
                return result;
                }
            var randomUID = getRandomString(10)
           
            await fb.productsCollection.add({
                description: newData.description,
                title: newData.title,
                Price: newData.price,
                userId: this.merchantId,
                merchantId: this.merchantId,
                category: newData.category,
                productImage: this.$store.state.newProdImage,
                itemUID: randomUID,
                prodFile: newFile
            }).then(
                this.$router.push({name: 'my-products'})
            )
        },
        async getMID(){
            const currentUs = await fb.auth.currentUser
            console.log(currentUs)
            return this.merchantId = currentUs.uid
        }
    }
}
</script>