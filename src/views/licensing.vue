<template>
    <section class="section is-full-width">
        <section class="container mb-8 mt-8 ml-8 mr-8 section">
            <div class="control">
                <input class="input is-focused" v-model="new_key" type="text" placeholder="enter a new product key">
                <button @click="createKey()" class="is-primary button">
                    save key
                </button>
            </div>
        </section>
        <div class="container is-full-width">
           <p class="label">Total: </p><p> {{ prodKeys.length }} </p>
        </div>
        <section v-if="!keysLoading" class="container section is-full-width mt-8 ml-8 mr-8">
           <p class="label"> All Licence Keys For This Product </p>
           <div v-for="(prodKey,i) in prodKeys" :key="i" class=" mt-8 mtb-4container">
                <licences :prodKey="prodKey"></licences>
           </div>
        </section>
        <section v-if="keysLoading" class="container is-full-width">
            <ring-loader></ring-loader>
        </section>

    </section>
</template>
<script>
import licences from '@/components/adminTasks/licences.vue'
import * as fb from '@/firebase.js'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
export default {
    name: "licensing",
    components:{
        licences, 
        RingLoader
    },
    data(){
        return{
            new_key: "",
            prodKeys: [],
            productInfo: {},
            keysLoading: true
        }
    },
    methods:{
        async createKey(){
            await fb.licenceKeys.add({
                key: this.new_key,
                productID: this.$route.params.chosen_item,
                productName: this.productInfo.title,
                merchantId: this.productInfo.merchantId,
                claimed: false
            }).then(()=>{
                this.new_key = ""
            }).then(()=>{
                this.keysLoading = true
                this.initKeys()
            })
        },
        async initKeys(){
            this.prodKeys = []
            await fb.productsCollection.doc(this.$route.params.chosen_item).get().then((doc)=>{
                this.productInfo = doc.data()
                this.productInfo.id = doc.id
            })
            await fb.licenceKeys.where("productID", "==", this.$route.params.chosen_item).get().then((docs)=>{
                console.log("something", docs)
                docs.forEach((doc)=>{
                    this.prodKeys.push(doc.data())
                    setTimeout(()=>{
                        this.keysLoading = false
                    }, 4000)
                    console.log(this.prodKeys)
                })
            })
        }
    },
    created(){
        this.initKeys()
    }
}
</script>