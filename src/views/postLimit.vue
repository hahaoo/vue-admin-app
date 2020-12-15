<template>
  <div class="post-limit">
    <div class="header">
      <van-nav-bar title="邮寄限制" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <p>
        1、<span class="red"> 液体</span
        >，一般的精华液、卸妆水、花露水都算是纯液体（像水一样的），会被误当作易燃性物品；（化妆品中的膏状类或稠状类物品除外），对于液体的判断就是瓶身倒立，里面的液体是否立马洒出来的都不能寄，而是滴出来的可以寄。
      </p>
      <p>
        2、铝制<span class="red"> 压力罐装喷剂</span
        >，比如啫喱水等物品也不行，会被疑似当作可燃性气体处理；
      </p>
      <p>3、胶囊、片剂以及其他一些西药等药品都不适宜寄送；</p>
      <p>4、<span class="red">烟</span>或疑似烟草物品不能寄送；</p>
      <p>5、<span class="red">动物或植物的种子</span>也不适宜寄送；</p>
      <p>6、<span class="red">各类光盘或碟片</span></p>
      <p>
        7、<span class="red">白色粉末类</span
        >的产品不适于邮寄，若实在需要可以单询，时效会比较长；
      </p>
      <p>
        8、大块的肉制品，比如腊肉或熏肉不能寄；猪肉脯、牛肉干、鸭舌等加工制品尚可邮寄；
      </p>
      <p>
        9、电器类的产品但凡是插电并且含有马达（能转）的产品都需要做磁性检测，按KG计费4元/KG的磁检费，最低60元；一般风扇、空气净化器等都需要做磁性检测；具体详询。
      </p>
      <p>
        10、含电池的产品可以接，但纯电类产品不接（如充电宝），时效相对比较慢，1KG额外收10元的处理费；
      </p>
      <p>
        11、另外特殊不能寄的物品有自热小火锅、暖宝宝贴、磁铁、染发剂、颜料、胶水类产品一概不接，未列入品类有疑问详细单询。
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
    return {

    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  }
}
</script>
<style lang="less" scoped>
.post-limit {
  text-align: left;
  background-color: #fff;
  font-size: 12px;
  height: 100vh;
  .content {
    padding: 10px;
  }
  p {
    padding: 5px;
  }
  .red {
    color: red;
  }
}
</style>
