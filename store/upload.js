export const state = () => ({

});
export const mutaions = {

};
export const actions = {
 async uploadFile ({commit}, payload) {
   console.log(payload)
    try {
      const url = 'https://testapi.agromart.uz'+'/api/upload';
      console.log(url)
      const data =await this.$axios({
        url: url,
        method: 'POST',
        data: payload
      })
     ;
      console.log('image upload', data)
      return data;
    } catch (err) {
      console.log(err)
    }
  }
}
