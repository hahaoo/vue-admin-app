<template>
  <div class="copy-content">
    <span
      class="copy-text"
      v-clipboard:copy="copyText"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      <img src="@/assets/copy.png" alt />
    </span>
  </div>
</template>

<script>
// @ is an alias to /src
import { Icon } from "vant";
export default {
  name: "FooterCom",
  components: {
    [Icon.name]: Icon,
  },
  props: ["copyText"],
  data() {
    return {};
  },
  methods: {
    // 复制成功
    onCopy(e) {
      this.$toast.success("复制成功");
      console.log(e);
    },
    // 复制失败
    onError(e) {
      this.$toast.success("复制失败");
    },
  },
};
</script>
<style lang="less">
.copy-content {
  display: inline;
}
.copy-text {
  font-size: 14px;
  color: #1087eb;
  // background: #eee;
  padding: 0px;
  vertical-align: middle;
  img {
    height: 19px;
  }
}
</style>
