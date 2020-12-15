<template>
  <div class="dt-loading">
    <van-overlay :show="show" class-name="bg-white">
      <div class="wrapper" @click.stop>
        <van-loading type="circular" color="#1989fa" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
/**
 * 自定义loading组件，带遮罩层
 */
import { Loading, Overlay } from "vant";
export default {
  name: "dtLoading",
  components: {
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
  },
  props: {
    value: Boolean,
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    value(val) {
      this.show = val
    }
  },
}
</script>

<style lang="less">
.dt-loading {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .bg-white {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
