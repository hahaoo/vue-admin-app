<template>
  <div class="logistics">
    <div class="header">
      <van-nav-bar title="查看物流" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content" v-if="trackInfoData.length > 0">
      <div class="wrap" v-for="detail in trackInfoData" :key="detail.id">
        <div class="title">
          <van-form size="mini">
            <van-field
              label="派送单号:"
              label-width="80px"
              readonly
              v-model="detail.trackNumber"
            />
            <van-field
              label="派送公司:"
              label-width="80px"
              readonly
              v-model="detail.deliverCompany"
            />
          </van-form>
        </div>
        <div class="detail">
          <h3>物流详情：</h3>
          <van-steps direction="vertical" :active="0">
            <van-step v-for="(item, index) in detail.trackInfo" :key="index">
              <h4>{{ item.statusDesc }} {{ item.location }}</h4>
              <p>{{ item.description }}</p>
              <p>{{ item.createTime }}</p>
            </van-step>
          </van-steps>
        </div>
      </div>
    </div>
    <div v-else>
      <h5 style="margin: 20px">暂无物流信息</h5>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { NavBar, Step, Steps, Field, Form } from "vant";
// import { getByPackageId } from "@/api/index";
export default {
  name: "logistics",
  components: {
    [NavBar.name]: NavBar,
    [Steps.name]: Steps,
    [Step.name]: Step,
    [Field.name]: Field,
    [Form.name]: Form,
  },
  data() {
    return {
      trackInfoData: [],
    };
  },
  created() {
    var id = this.$route.query.id;
    this.getTrackInfo(id);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async getTrackInfo(id) {
      // let res = await getByPackageId({ transportPackageId: id });
      // if (res && res.ErrorCode == "9999") {
      //   this.trackInfoData = res.Data.Results;
      // }
      // alert(JSON.stringify(this.trackInfoData));
    },
  },
};
</script>
<style lang="less" scoped>
.logistics {
  .wrap {
    background-color: #fff;
    margin: 8px;
    h3 {
      font-size: 14px;
      text-align: left;
      margin: 10px;
    }
    .detail {
      p,
      h4 {
        font-size: 12px;
        text-align: left;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
