<template>
    <section class="container columns is-multiline">
        <div v-for="(prod, i) in UserProducts" :key="i">
        <div class="container is-full-width mb4 mt4 ml4">
            <itemDisplay :prod="prod"/>
        </div>
        </div>
    </section>
</template>
<script>
import itemDisplay from '@/components/adminTasks/itemDisplay.vue'
import * as fb from '@/firebase.js'
export default {
    name: 'allItems',
    components:{
        itemDisplay
    },
    data(){
        return{
            UserProducts: []
        }
    },
    methods:{
        async chosenMemberData(){
            this.UserProducts =[]
            var getID = await fb.auth.currentUser.uid
            console.log(getID)
            await fb.productsCollection.where("merchantId","==", getID).onSnapshot((snapshot)=>{
                console.log(snapshot)
                snapshot.forEach((doc)=>{
                    var prod = doc.data()
                    prod.id = doc.id
                    console.log(prod)
                    this.UserProducts.push(prod)
                })
            })
        }
    },
    created(){
        this.chosenMemberData()
    },
    watch:{
        router(to, from, next){
            this.UserProducts = []
            next()
        }
    }
}
</script>>