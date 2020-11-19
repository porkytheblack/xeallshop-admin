<template>
    <section class="containers isHeight700">
    <!--first-->
        <div  @click="chooseProp('to profile')" class="container is-hover is-link field mb-2 mt-2 controls">
        <div class="  is-capitalized has-text-centered has-text-weight-bold ">
        <p class="text-is-capital text24 text-dg text-is-green">View Profile</p>
        </div>
        </div>
         <!--second-->
        <div  @click="chooseProp('add item')" class="container is-hover is-link field mb-2 mt-2 controls">
        <div class="  is-capitalized has-text-centered has-text-weight-bold ">
        <p class="text-is-capital text24 text-dg text-is-green">Add New Item</p>
        </div>
        </div>
        <!--second-->
        <div  @click="chooseProp('products')" class="container is-hover is-link field mb-2 mt-2 controls">
        <div class="  is-capitalized has-text-centered has-text-weight-bold ">
        <p class="text-is-capital text24 text-dg text-is-green">View Products</p>
        </div>
        </div>
        <!--second-->
    </section>
</template>
<script>
export default {
    name: 'dashLink',
    methods:{
        chooseProp(nm){
            if(nm === "add item"){
                this.$router.push({name: 'newItem'})
            }if(nm === "to profile"){
                this.$router.push({name: 'profile'})
            }if(nm == "products"){
                this.$router.push({name: 'my-products'})
            }
        }
    }
}
</script>