<template>
  <div id="app">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/">在线编辑</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/base">基础使用</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/yaml">YAML例子</router-link></el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div> 
</template>

<script>

export default {
  name: 'app',
  components: {},
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
