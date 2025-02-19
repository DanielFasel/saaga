// Needed for Axios
import Vue from 'vue'

export default{

  languageTranslated({commit, state, rootState}, data){
    // Fetches the languages to be translated and commits them
    Vue.prototype.$http.get('/translator/languages',{params:{language: data}})
    .then(function (response) {
      // If success commit the languages. The 'if' statement to prevents from adding languages every time the mainpages is mounted after the load page (it would double the languages)
      if(state.languageTranslated.length < rootState.assigned_languages.length){
        // Initiate the index variable and set default
        var saveIndex="last"
        // check the alphabetical order of the received klanguage and give the appropriated index back
        if(state.languageTranslated.length>0){
          for(var i=0; i<state.languageTranslated.length;i++){
            // the upercase is needed to make sure it's case insensitive
            var nameData = response.data['name'].toUpperCase()
            var nameList = state.languageTranslated[i]['name'].toUpperCase()
            if(nameData<nameList){
              saveIndex=i
            }
          }
        }
        // prepare the data to be commited with the "language" and it's "index"
        var data = {language: response.data, index:saveIndex}
        // commit
        commit('languageTranslated',data)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  },

  defaultLanguageTranslated({commit,state}, data){
    // Fetches default languages and commits it
    Vue.prototype.$http.get('/translator/languages',{params:{language: data}} )
    .then(function (response) {
      // If success commit the default language (english). The 'if' statement to prevents from adding languages every time the mainpages is mounted after the load page (it would double the languages)
      if(state.defaultLanguageTranslated.length < 1){
        commit('defaultLanguageTranslated',response.data)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  },

  postTranslation({commit, state, getters, dispatch}, data){
    console.log("Temporaray fed ot the server " + data['temporary'])
    // saves translations or temporary translations
    Vue.prototype.$http.patch('/translator/translations', data )
    .then(function (response) {
      // If it is a success and a translations it will commit the response in order to keep the back end and front end synchronised. It doesn't do it with the temporary translations because of the delay that would make the UI unintutive
      console.log("Temporary gotten from server " + response.data['temporary'])
      if(data['type']=='translation'){
        data['userId']=response.data['user_id']
        data['translation']=response.data['translation']
        data['validated']=response.data['validated']
        data['temporary']=response.data['temporary']
        commit('saveTranslation', data)

        //check percentage is 100'
        var languageIndex = data['selected']['language']['index']
        var percentage = getters.languageTotalCompleted(languageIndex)
        var total = state.languageTranslated[languageIndex]['total']
        if(total-total*percentage/100<0.5){
          dispatch('layout/modalDrawer/toggleValidationAlert', null, {root: true})
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  },

  validateLanguage(context, data){

    Vue.prototype.$http.patch('/translator/validate_languages/'+ data )
    .then(function (response) {
      console.log("Success")

    })
    .catch(function (error) {
      console.log(error);
    })

  }
}
