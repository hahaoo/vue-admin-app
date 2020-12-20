<template>
  <div class="product-type-pop-wrap">
    <div class="header">
      <van-nav-bar title="商品申报类别" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-grid :column-num="2" direction="horizontal" :gutter="3">
        <van-grid-item class="item">
          <img src="../../assets/icon1.png" alt class="item-img" />
          <span class="item-text">普货</span>
        </van-grid-item>
      </van-grid>

      <van-grid
        :column-num="1"
        direction="horizontal"
        :gutter="3"
        class="tips-box"
      >
        <van-grid-item
          >普货指一般的衣服、包包、鞋靴、裤袜、配饰、日常家居用品、收纳用品、床上用品、窗帘、布匹、卫生棉、纸巾，服装配饰等都算是普货。</van-grid-item
        >
      </van-grid>

      <div class="tips-title">以下类别要进行人工审核</div>

      <van-grid :column-num="2" direction="horizontal" :gutter="3">
        <van-grid-item class="item" v-for="item in typeList" :key="item.id">
          <img :src="item.imgSrc" alt class="item-img" />
          <span class="item-text">{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import { NavBar, Grid, GridItem } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      typeList: [
        {
          id: "1",
          name: "仿牌",
          imgSrc: "./icon/icon1.png",
        },
        {
          id: "2",
          name: "带电产品",
          imgSrc: "./icon/icon1.png",
        },
        {
          id: "3",
          name: "生活电器",
          imgSrc: "./icon/icon1.png",
        },
        {
          id: "4",
          name: "化妆品",
          imgSrc: "./icon/icon1.png",
        },
        {
          id: "5",
          name: "欧美品牌",
          imgSrc: "./icon/icon1.png",
        },
        {
          id: "6",
          name: "粉末",
          imgSrc: "./icon/icon1.png",
        },
        {
          id: "7",
          name: "食品",
          imgSrc: "./icon/icon1.png",
        },
        {
          id: "8",
          name: "液体",
          imgSrc: "./icon/icon1.png",
        },
      ],
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$emit("closeProductTypePop");
    },
  },
};
</script>

<style lang="less">
.product-type-pop-wrap {
  [class*="van-hairline"]::after {
    border: none 0 !important;
  }
  .content {
    margin-top: 10px;
    .tips-box {
      margin-top: 5px;
      text-align: left;
      font-size: 11px;
      color: #aaa;
      line-height: 18px;
      .van-grid-item__content {
        padding: 10px;
      }
    }
    .tips-title {
      margin: 15px 0 8px 10px;
      text-align: left;
      font-size: 11px;
      color: #aaa;
      line-height: 18px;
    }
    .item {
      text-align: left;
      font-size: 14px;
      color: #333;
      .van-grid-item__content {
        padding: 10px 30px;
        text-align: left;
        justify-content: left;
      }
      .item-img {
        height: 18px;
        margin-right: 10px;
      }
    }
  }
}
</style>
