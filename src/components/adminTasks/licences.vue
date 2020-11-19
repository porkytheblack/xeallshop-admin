<template>
    <div class="container card mt-6 mb-6 columns is-rounded isHeight50">
        <div class="column label">
            key: {{prodKey.key}} 
        </div>
        <div class="column has-background-success">
            {{status}}
        </div>
        <div class="column">
            Name: {{prodKey.productName}}
        </div>
    </div>
</template>
<script>
export default {
    name: "licences",
    props: {
        prodKey:{
            type: Object
        }
    },
    computed:{
        status(){
            if(this.prodKey.claimed){
                return "claimed"
            }else {
                return "unclaimed"
            }
        }
    }
}
</script>