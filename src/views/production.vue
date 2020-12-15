<template>
  <div class="production">
    <div class="header">
      <van-nav-bar
        title="转运服务使用教学"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <p style="text-align: center;"><strong>如何中国淘宝至国外？</strong></p>
      <p>
        <strong>第一步</strong>
        关注我们物流驿站的微信公众号后，默认就已经完成了注册，并不需要再单独的填写其他资料信息;
      </p>
      <p>
        <strong>第二步</strong>
        提交国内的转运申请，做包裹预报;
      </p>
      <p>
        <img src="@/assets/step1.jpg" alt width="100%" />
      </p>
      <p>在填写包裹预报或中国国内各大网站购物时建议先看一下“邮寄限制”;</p>
      <p><img src="@/assets/step2.jpg" alt width="100%" /></p>
      <p>
        包裹备注，就是寄过来的是什么东西，有什么要求没有。比如全棉时代洗脸巾；
        <br />
        快递单号就是寄送过来的国内物流单号，只需要填写单号即可，无需要写快递公司，如果多个单号就逗号分隔；
        <br />
        仓库地址在平台上按如下格式填写： <br />
        收件人：樊俊转（用户的名字）<br />
        地 址：上海市 松江区 九亭镇 九舒路518号4栋206；
      </p>
      <p>
        <strong> 第三步</strong> 国内已签收包裹的确认
        已经预报成功的包裹可以在如下页面入口进入查看;
      </p>
      <p>
        <img src="@/assets/step3.jpg" alt width="100%" />
      </p>
      <p>
        <img src="@/assets/step4.jpg" alt width="100%" />
      </p>
      <p>已经入库的包裹可以查看物流单号下的图片进行货物确认，如下图所示的：</p>
      <p><img src="@/assets/step5.jpg" alt width="100%" /></p>
      <p>
        <strong>第四步</strong>
        海外包裹寄送<br />
      </p>
      <p style="text-indent: 1em;">
        对于需要转运的包裹若均已入库并且确认无误，就可以申请打包，勾选需要本次寄送的包裹
        ，然后“提交寄送”;
      </p>
      <p style="text-indent: 1em;">
        如果是首次寄送，则需要添加一个海外的收货地址信息，收件地址填写完成后，可根据自己的选择或者客服推荐选择合适的物流渠道，再支付寄送至海外的国际运费;
      </p>
      <p><img src="@/assets/step6.jpg" alt width="100%" /></p>
      <p class="red">
        PS：现阶段针对所有渠道，若发现包裹丢失，我们是按50元/KG对货值进行赔偿
        ，运费付多少另行赔付多少。高价值物品若不接受以上赔偿条款，可走不包清关和税的商业快递（如DHL、TNT）
      </p>
      <p>
        <strong>第五步</strong>
        物流驿站完成包裹的打包、出库，国际寄送 ，你就坐着收货即可.
      </p>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { NavBar } from "vant";
export default {
  name: "postLimit",
  components: {
    [NavBar.name]: NavBar,
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.production {
  text-align: left;
  background-color: #fff;
  font-size: 14px;
  .content {
    padding: 10px;
  }
  p {
    padding-bottom: 5px;
  }
  .red {
    color: red;
  }
}
</style>
