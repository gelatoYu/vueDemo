<template>
  <div id="app">
    <h3 @click="addNum">计算个数:{{$store.state.count}}</h3>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods:{
    addNum(){
      this.$store.commit('increment');
    }
  }
}
</script>

<style>

</style>
