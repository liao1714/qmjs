import router from 'umi/router'
const history = require('umi/lib/createHistory').default({
  basename: window.routerBase,
})

const Router = function(){
  return{
    push:function(path, query){
      if (history.location.query.accessType) {
        query = {
          accessType: history.location.query.accessType,
          ...query
        }
      }
      router.push({pathname: path, query: query || {}})
    },
    replace:function(path, query){
      if (history.location.query.accessType) {
        query = {
          accessType: history.location.query.accessType,
          ...query
        }
      }
      router.replace({pathname: path, query: query || {}})
    },
    go:function(count){
      if (window.history.length <= 1) {
        Router.replace('/home')
      } else {
        router.go(count)
      }
    }
  }
}()

export default Router
