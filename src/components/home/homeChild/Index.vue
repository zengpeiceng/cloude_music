<template>
  <div id="index">
    <rotation/>
    <Content/>
  </div>
</template>

<script>
import Rotation from './Rotation.vue';
import Content from './content.vue';
export default {
  components: { Rotation,Content },
  name: 'Index',
  data() {
    return {
      
    };
  }
};
</script>

<style lang="scss" scoped>

</style>