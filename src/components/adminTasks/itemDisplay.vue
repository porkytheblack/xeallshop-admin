<template>
<div v-if="deleteSuccess" class="button is-danger">
    item deleted successfully
</div>
    <section v-if="!deleteSuccess" class="container is-full-width">
        <div class="containers isHeight250 isWidth800 containers-is-flex centered">
        <figure class="image containers is-128x128 imageOverflow">
            <img :src="prod.productImage" alt="" class="">
        </figure>
        </div>
        <div class="containers  textRoboto text-is-uppercase">
            {{prod.title}}
        </div>
        <div class="containers  textRoboto text-is-uppercase">
            {{prod.description}}
            {{prod.merchantId}}
            {{prod.Price}}
        </div>
        <div class="has-icons field">
            <div class="controls">
                <i @click="itemEdit()" class="icon is-link is-small fa fa-edit text-is-dc">
                </i>
                <i @click="deleteItem()" class="icon is-small fa fa-trash text-is-dc"></i>
            </div>
        </div>
    </section>
</template>
<script>
import * as fb from '@/firebase.js'
export default {
    name: 'itemDisplay',
    props:{
        prod: {
            type: Object
        }
    },
    data(){
        return{
            deleteSuccess: false
        }
    },
    methods:{
        async itemEdit(){
            var item = await fb.productsCollection.doc(this.prod.itemUID)
            console.log(item)
            this.$router.push({name: 'itemEdit', params:{item_id: `${item.id}`}})
        },
        async deleteItem(){
            var item = await fb.productsCollection.doc(this.prod.id)
            item.delete().then(
                console.log("delete successfull"),
                this.$router.push({name: 'my-products'}),
                this.deleteSuccess = true
            )
        }
    }
}
</script>