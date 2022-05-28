<template>
  <div class="empty">
    <i></i>
    <slot name="content">暂无数据</slot>
  </div>
</template>

<script>
export default {
  name: 'Empty'
};
</script>

<style lang="scss" scoped>
.empty {
    width: 100%;
    text-align: center;
    padding: 105px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      display: inline-block;
      width: 64px;
      height: 50px;
      background: url('https://s2.music.126.net/style/web2/img/icon.png?e71b3dcf5df100518a4b5b9bda074ed6');
      background-position: 0 -347px;
      margin-right: 15px;
      vertical-align: center;
    }
  }
</style>