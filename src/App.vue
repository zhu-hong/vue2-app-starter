<script>
import avatar from './assets/avatar.jpeg'

export default {
  data() {
    return {
      msg: 'hello',
      avatar,
    }
  },
  mounted() {
    console.log(this, '巴拉巴拉巴拉巴拉吧')
  },
}
</script>

<template>
  <div>
    <span class="niu font-bold">{{ msg }}<span class="niu-niu">world</span></span>
    <img class="w-20 object-cover cursor-pointer" :src="avatar">
    <img src="./assets/avatar.jpeg">
  </div>
</template>

<style lang="postcss">
.niu {
  color: lightcoral;
  font-size: 1rem;
   
  &-niu {
    font-size: 14px; 
  }
}
</style>
