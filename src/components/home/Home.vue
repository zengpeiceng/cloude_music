<template>
  <div id="home">
    <!-- <div v-if="$route.path === '/'">  
      <rotation/>
      <Content/>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Rotation from './homeChild/Rotation.vue'
// import Content from './homeChild/content.vue'
 export default {
   name: 'Home',
  //  components: {
  //    Rotation,
  //    Content,
  //  },
};

</script>
<style  scoped>

</style>