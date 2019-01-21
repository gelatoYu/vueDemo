// 导入Vue
import Vue from 'vue';
// 导入Vuex
import Vuex from 'vuex';
// 注册插件
Vue.use(Vuex)

// 实例化仓库
const store = new Vuex.Store({
  // 仓库(数据)
  state: {
    // 购物车的数据
    cartData: JSON.parse(window.localStorage.getItem('cartData')) || {}
  },
  // 对外暴露的修改方法
  mutations: {
    // 加入购物车 2->To
    add2Cart(state, fruit) {
      // console.log(fruit);
      // 添加到仓库中
      // 购物车中有 个数累加
      if(state.cartData[fruit.name]){
        state.cartData[fruit.name].num++;
      }else {
        // state.cartData[fruit.name]=fruit;
        // state.cartData[fruit.name].num=1;
        Vue.set(state.cartData,fruit.name,fruit);
        Vue.set(state.cartData[fruit.name],'num',1);
      }
      },
      //删除购物车数据
      removeCart(state,fruit){
        // console.log(fruit);
        Vue.delete(state.cartData,fruit.name);
        
      }
    },
    getters:{
      totalNum(state){
        let num = 0;
        for (const key in state.cartData) {
         num+= state.cartData[key].num ;
        }
        return num;
      }
    }
});

//保存数据,关闭浏览器
window.onbeforeunload = function () { 
  window.localStorage.setItem('cartData',JSON.stringify(store.state.cartData));
 }

// 暴露出去
export default store;