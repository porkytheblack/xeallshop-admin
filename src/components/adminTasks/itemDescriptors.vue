<template>
    <section class="container">
    <div @keyup="Tstr()" class="field controls container"><input v-model.trim="descriptors.title" placeholder="enter a title" type="text" class="input"></div>
    <textarea @keyup="Tstr()" class="isWidth400 containers mb-4 field input" v-model.trim="descriptors.description" placeholder="describe your product" name="" id="" cols="30" rows="360">
    </textarea>
    <div @keyup="Tstr()" class="field controls mb-4 container"><input v-model.trim="descriptors.price " type="number" placeholder="enterPrice" class="input"></div>
    <div @keyup="Tstr()" class="field controls mb-4 container"><input v-model.trim="descriptors.merchantId" type="text" placeholder="enter BTC wallet address" class="input"></div>
    <div @keyup="Tstr()" class="field controls mb-4 container"><input v-model.trim="descriptors.category" type="text" placeholder="enter category" class="input"></div>
    <div @keyup.enter="addTag()" class="field mb-4 container"><input type="text" v-model.trim="descriptors.tag" class="input"></div>
    </section>
</template>>
<script>
export default {
    name: 'itemDescriptors',
    data(){
        return{
            descriptors:{
                description: "",
                title: "",
                price: 0,
                merchantId: "",
                category: "",
                tag: "",
            },
            tags: []
        }
    },
    methods:{
        async Tstr(){
            this.$store.dispatch('addDescriptors', this.descriptors)
        },
       async descriptorsUpload(){
            console.log(this.descriptors)
            await this.$emit('descriptors-upload',{
                descriptors: this.descriptors
            })
        },
        addTag(){
            this.tags.push(this.descriptors.tag)
            this.$store.dispatch('prodTags', this.tags)
            this.descriptors.tag = ""
        }
    }
}
</script>>