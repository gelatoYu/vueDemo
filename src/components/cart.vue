<template>
  <div class="cart-container">
    <el-table :data="cartList" style="width: 100%">
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="prop">
          <img :src="prop.row.url" alt class="icon">
        </template>
      </el-table-column>
      <el-table-column label="数量" width="180">
        <template slot-scope="prop">
          <el-input-number v-model="prop.row.num"  :min="1" label="描述文字"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="180"></el-table-column>
      <el-table-column label="总价" width="180">
        <template slot-scope="prop">{{Math.floor(prop.row.num*prop.row.price)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="prop">
          <el-button type="danger" @click="deleteOne(prop.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 总价 -->
    <p>总价:{{totalPrice}}</p>
    <!-- 结算 -->
    <el-button type="success" @click="payMoney">结算</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartList: []
    };
  },
  computed:{
    totalPrice(){
      let sum = 0;
      this.cartList.forEach(v=>{
        sum+=v.num*v.price
      });
      return sum ;
    }
  },
  methods: {
    deleteOne(data) {
      // console.log(data);
      
        this.$confirm('你确定删除该商品吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除
          //移除购物车值
          let index = this.cartList.indexOf(data);
          this.cartList.splice(index,1);
          this.$store.commit('removeCart',data);
        }).catch(() => {
          //不删除         
        });
      },
      payMoney(){
        //删除cartlist 所有数据
        for (let index = this.cartList.length-1; index >=0; index--) {
          //先删除vuex
          this.$store.commit('removeCart',this.cartList[index]);
          //再删除本地数组
         this.cartList.splice(index,1);
          
        }
        //vuex中数据也要全部删除
      }
  },
  created() {
    let cartData = this.$store.state.cartData;
    for (const key in cartData) {
      this.cartList.push(cartData[key]);
    }
  }
};
</script>
<style >
.icon {
  width: 100px;
  height: 100px;
  display: block;
}
</style>