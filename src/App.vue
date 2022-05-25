<script>
export default {
  data() {
    return {
      msg: 'zhu',
    }
  },
  mounted() {
    console.log('巴拉巴拉巴拉巴拉吧')
  },
}
</script>

<template>
  <span class="niu font-bold">{{ msg }}<span class="niu-niu">niu</span></span>
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
