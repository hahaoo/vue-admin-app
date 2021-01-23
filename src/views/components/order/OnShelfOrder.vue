<template>
  <div class="on-shelf-order">
    <div class="content fixed-height">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-checkbox-group v-model="checkedResults" ref="checkboxGroup">
            <div class="order-card" v-for="(item, index) in list" :key="index">
              <van-cell-group>
                <van-cell>
                  <template #title>
                    <div class="title">
                      <span @click="toggle(index)" style="display: flex">
                        <van-checkbox
                          :name="item.trackNo"
                          :disabled="item.isDisabled"
                          ref="checkboxes"
                        ></van-checkbox>

                        <span class="custom-title">
                          ({{ parseInt(index) + 1 }}) 物流单号：{{
                            item.trackNo
                          }}
                        </span>
                      </span>

                      <Copy :copyText="item.trackNo"></Copy>
                    </div>
                  </template>
                  <template #right-icon>
                    <van-tag type="primary" size="medium" plain>{{
                      formatStatus(item.state)
                    }}</van-tag>
                  </template>
                </van-cell>
              </van-cell-group>
              <van-card
                :title="item.remark"
                :desc="item.type == 2 ? item.groupName : ''"
                :thumb="item.pic ? item.pic : '3.png'"
                @click-thumb="onClickThumb(item)"
              ></van-card>
              <van-cell-group>
                <van-cell>
                  <template #title>
                    <span class="summary-title">
                      实重：{{ item.weight }}(g) 体积：{{ item.length }}*{{
                        item.width
                      }}*{{ item.height }} cm³
                    </span>

                    <van-button
                      v-if="item.type == 2"
                      plain
                      round
                      size="small"
                      type="danger"
                      class="right-botton"
                      @click="removePinyou(item)"
                      >移除拼邮</van-button
                    >
                    <van-button
                      v-else
                      plain
                      round
                      size="small"
                      type="primary"
                      class="right-botton"
                      @click="goToPinyou(item)"
                      >拼邮</van-button
                    >
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
    </div>

    <div class="footer-info">
      <div class="footer-inner">
        <van-checkbox @click="checkAll" v-model="checked"
          >全选(已勾选{{ checkedResults.length }}多项)</van-checkbox
        >
        <van-button round type="info" @click="onSubmit()">提交寄送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Copy from "@/components/Copy";
import { findPackageCustomApi } from "@/api/index";
import {
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Panel,
  Card,
  Tag,
  Button,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Popup,
  ImagePreview,
} from "vant";
export default {
  name: "home",
  components: {
    Copy,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  props: ["state"],
  data() {
    return {
      imgUrl: "",
      images: [],
      checkedResults: [], //选中的
      list: [],
      searchParam: {
        customid: "",
        pageSize: 10,
        currentPage: 1,
        state: 2,
      },
      checked: false,
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 0, //分页
    };
  },
  watch: {
    checkedResults(val) {
      if (val.length == this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  created() {
    console.log(this.state);
  },
  methods: {
    formatStatus(state) {
      switch (state) {
        case 1:
          return "已申报";
          break;
        case 2:
          return "已入库";
          break;
        case 3:
          return "待打包";
          break;
        case 4:
          return "已出库";
          break;
        case 5:
          return "已发货";
          break;
        case 6:
          return "已签收";
          break;
        case 100:
          return "作废";
          break;
      }
    },
    //获取数据
    async getList(pageNum) {
      this.searchParam.customid = this.$store.state.employee.id;
      this.searchParam.state = this.state;
      this.searchParam.currentPage = pageNum;
      let res = await findPackageCustomApi(this.searchParam);
      if (res && res.ack == "200" && res.data.length > 0) {
        console.log(res);
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          this.list.push(data[i]);
        }
        if (this.list.length >= res.total) {
          this.finished = true;
        }
      } else {
        this.finished = true;
        this.$toast.fail(res.msg);
      }
      this.loading = false;
    },

    onLoad() {
      this.loading = true;
      this.getList(++this.pageNum);
    },
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.finished = false;
      this.pageNum = 0;
      this.onLoad(); // 重新加载数据
      this.refreshing = false;
    },
    //已上架的转运单去拼邮
    goToPinyou(item) {
      var pinyouData = {
        goodsType: item.goodsType,
        remark: item.remark,
        trackNo: item.trackNo,
      };
      this.$router.push({
        path: "/startPinyou",
        query: {
          actionType: "onShelfPinyou",
          pinyouData: JSON.stringify(pinyouData),
        },
      });
    },
    //已上架的拼邮单，删除拼邮
    removePinyou(item) {},
    toggle(index) {
      // console.log(this.checkedResults);
      this.$refs.checkboxes[index].toggle();
      // console.log(this.checkedResults);
    },
    onClickThumb(item) {
      // console.log(item.imgUrl);
      if (item.imgUrl) {
        this.images = [item.imgUrl];
      } else {
        this.images = ["3.png"];
      }
      ImagePreview({
        images: this.images,
        closeable: true,
        loop: false, //是否循环播放\
      });
    },
    checkAll() {
      if (this.list.length <= 0) {
        return;
      }
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    onSubmit() {
      console.log(this.checkedResults);
      if (this.checkedResults.length > 0) {
        let ftItem = this.list.filter((item) => {
          return this.checkedResults.includes(item.trackNo);
        });
        let totalWeight = ftItem
          .map((item) => {
            return item.weight;
          })
          .reduce((x, y) => {
            return Number(x) + Number(y);
          });

        let volumeArr = ftItem.map((item) => {
          return item[length] * item.width * item.height;
        });

        // console.log(this.checkedResults);
        this.$router.push({
          path: "/confirmSend",
          query: {
            weight: totalWeight,
            data: JSON.stringify({
              trackNoList: this.checkedResults,
              volumeArr: volumeArr,
            }),
          },
        });
      } else {
        this.$notify("至少选中一个包裹");
      }
    },
  },
};
</script>
<style lang="less">
.on-shelf-order {
  position: relative;
  .content {
    padding-bottom: 100px;
    .van-card__content {
      text-align: left;
    }
    .van-cell__title {
      // display: flex;
      text-align: left;
      .title {
        display: flex;
      }
      .van-checkbox__icon {
        font-size: 15px;
      }
    }
    .custom-title {
      padding: 0 8px;
      font-size: 14px;
    }
    .summary-title {
      padding: 0 8px;
      font-size: 14px;
      color: #1087eb;
    }
    .right-botton {
      float: right;
    }
    .order-card {
      margin-top: 10px;
      .van-card {
        margin-top: 0px;
        background-color: #fff;
        .van-card__title {
          font-size: 14px;
          margin: 5px 0;
        }
        // .van-card__thumb {
        //   width: 60px;
        //   height: 60px;
        // }
        .van-card__desc {
          margin: 6px 0px;
          font-size: 12px;
        }
        .van-card__price-integer {
          color: red;
          font-size: 12px;
        }
        .van-card__num {
          font-size: 14px;
        }
      }
    }
  }

  .footer-info {
    background-color: #fff;
    z-index: 100;
    position: fixed;
    bottom: 0;
    width: 100%;
    .footer-inner {
      padding: 10px;
      display: flex;
      .van-checkbox {
        flex: 1;
        text-align: left;
        .van-checkbox__icon {
          font-size: 15px;
        }
        .van-checkbox__label {
          font-size: 14px;
        }
      }
      .van-button {
        width: 100px;
      }
    }
  }
}
</style>
