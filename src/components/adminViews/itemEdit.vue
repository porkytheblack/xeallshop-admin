<template>
    <section class="containers centered is-full-width tile is-parent">
        <div   class="field controls container"><input v-model.trim="prodEdits.title" placeholder="enter a title" type="text" class="input"></div>
    <textarea   class="isWidth400 containers mb-4 field text" v-model.trim="prodEdits.description" placeholder="describe your product" name="" id="" cols="30" rows="20">
    </textarea>
    <div   class="field controls mb-4 container"><input v-model.trim="prodEdits.price " type="number" placeholder="enterPrice" class="input"></div>
    <div   class="field controls mb-4 container"><input v-model.trim="prodEdits.category" type="text" placeholder="enter category" class="input"></div>
    <div @click="makeChanges()" class="button is-primary mt-4"> submit changes </div>
    </section>
    
    <div @click="permits()" class="ui button is-primary"> view licences for the product </div>
    <router-view>
    </router-view>
</template>
<script>
import * as fb from '@/firebase.js'
export default {
    name: "itemEdit",
    data(){
        return{
            prodEdits:{
                title: "",
                description: "",
                price: 0,
                category: "",
                tags: [],
                id: ""
            }
        }
    },
    methods:{
        permits(){
            console.log("change032")
            console.log(this.prodEdits.id)
            this.$router.push({name: "permits", params:{chosen_item: this.prodEdits.id}})
        },
        async initializeItemEdit(){
            await fb.productsCollection.where("itemUID", "==", `${this.$route.params.item_id}`).onSnapshot((snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                    var item = doc.data()
                    item.id = doc.id
                    console.log(item)
                    if(doc && doc.exists){
                        this.prodEdits.title = item.title
                        this.prodEdits.description = item.description
                        this.prodEdits.price = item.Price
                        this.prodEdits.category = item.category,
                        this.prodEdits.id = item.id
                    }
                })
            })
        },
        async makeChanges(){
            console.log(this.prodEdits.id)
            await fb.productsCollection.doc(`${this.prodEdits.id}`).update({
                "title": this.prodEdits.title,
                "description": this.prodEdits.description,
                "Price": this.prodEdits.price,
                "category": this.prodEdits.category
            }).then(
                console.log("done")
            ).catch((e)=>{
                console.log(e)
            })
            this.$router.push({name: 'my-products'})
        }
    },
    created(){
        this.initializeItemEdit()
    }
}
</script>