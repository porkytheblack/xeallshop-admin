import { createStore } from 'vuex'

export default createStore({
  state: {
    newProdImage: "",
    newProdFile: "",
    thisTags: [],
    descriptorsData: {}
  },
  mutations: {
  },
  actions: {
    //go to dashboard
    toDash({state}){
      this.$router.push({name: "admin-dash"})
      console.log(state)
    },
    //send Image to State Making it accessible thru parent
    prodImage({state}, imgUrl){
      state.newProdImage =  imgUrl
      console.log(state.newProdImage)
    },
    //uploadFile
    prodFile({state}, fileUrl){
      state.newProdFile = fileUrl
      console.log(state.newProdFile)
    },
    //new Descriptors before upload
    addDescriptors({state}, descriptors){
      state.descriptorsData = descriptors
      console.log(state.descriptorsData)
    },
    prodTags({state}, ptags){
      state.thisTags = ptags
      console.log(state.thisTags)
    }
  },
  modules: {
  }
})
