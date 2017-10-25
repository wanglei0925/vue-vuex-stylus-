<template>
  <div class="header">
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="header-top">
      <div v-if="seller.supports" class="num" @click="shows">
        {{seller.supports.length}}个
        <span class="icon"> > </span>
      </div>
      <div class="header-avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="header-descript">
        <div class="title">
          {{seller.name}}

        </div>
        <div class="desp">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达

        </div>
        <div class="detail" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="header-bottom" @click="shows">
      <div class="more"> > </div>
      <span class="icon"></span>
      <span class="text">{{seller.bulletin}}</span>
    </div>
    <detail :seller="seller"></detail>
  </div>

</template>
<script type="text/ecmascript-6">
  import detail from '../detail/detail'
  import { mapMutations } from 'vuex'
  export default {
    props: {
      seller: {
        type: Object,
        return: {
          default: {}
        }
      }
    },
    data() {
      return {
        deta: false
      }
    },
    mounted() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'special', 'invoice']
    },
    methods: {
      shows() {
        this.detail(true)
      },
      ...mapMutations({
        detail: 'SET_DETAIL'
      })
    },
    components: {
      detail
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixthin.styl'
  .header
    position: relative
    height: px2rem(270)
    background: rgba(7, 17, 27, 0.5)
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    overflow: hidden
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
      img
        width: 100%
    .header-top
      display: flex
      padding-top: px2rem(48)
      padding-left: px2rem(48)
      height: px2rem(214)
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      position: relative
      .num
        position: absolute
        height px2rem(48)
        -webkit-box-sizing: border-box
        -moz-box-sizing: border-box
        box-sizing: border-box
        font-size: px2rem(20)
        color: #fff
        text-align: left;
        line-height: px2rem(24)
        font-weight: 200
        border-radius: px2rem(20)
        background: rgba(0, 0, 0, 0.2)
        padding: px2rem(12) px2rem(40) px2rem(12) px2rem(20)
        bottom: px2rem(30)
        right: px2rem(24)
        .icon
          display: block
          right: px2rem(20)
          top: px2rem(12)
          line-height: px2rem(24)
          position: absolute
      .header-avatar
        width: px2rem(128)
        height: px2rem(128)
        margin-right: px2rem(32)
        font-size: px2rem(20)
        flex: 0 1 px2rem(128)
        img
          width: 100%;
          border-radius: px2rem(4)
      .header-descript
        flex: 1
        .title
          font-size: px2rem(32)
          color: #fff
          padding-left: px2rem(68)
          line-height px2rem(36)
          background-repeat: no-repeat
          background-size: px2rem(58) px2rem(36)
          bg-image(brand)
        .desp
          font-size: px2rem(24)
          color: rgb(255, 255, 255)
          margin: px2rem(16) 0 px2rem(20) 0
          line-height px2rem(24)
          font-weight: 200
        .detail
          font-size: 0
          color: #fff
          .icon
            width: px2rem(24)
            height: px2rem(24)
            margin-right: px2rem(8)
            vertical-align: top
            display: inline-block
            background-size: px2rem(24) px2rem(24)
            &.decrease
              bg-image(decrease_1)
            &.discount
              bg-image(discount_1)
            &.guarantee
              bg-image(guarantee_1)
            &.special
              bg-image(special_1)
            &.invoice
              bg-image(invoice_1)
          .text
            vertical-align: top
            font-size: px2rem(20)
            line-height: px2rem(24)
            display: inline-block

    .header-bottom
      position: relative
      width: 100%
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      padding-right: px2rem(50)
      height: px2rem(56)
      line-height: px2rem(56)
      overflow: hidden
      -ms-text-overflow: ellipsis
      text-overflow: ellipsis
      white-space: nowrap
      font-size: px2rem(20)
      font-weight: 200
      color: #fff
      background: rgba(7, 17, 27, 0.2)
      .icon
        width: px2rem(48)
        height: px2rem(25)
        margin-right: px2rem(8)
        margin-left: px2rem(24)
        margin-top: px2rem(15)
        vertical-align: top
        display: inline-block
        bg-image(bulletin)
        background-repeat: no-repeat
        background-size: px2rem(48) px2rem(25)
      .more
        position: absolute
        font-size: px2rem(36)
        line-height: px2rem(56)
        width: px2rem(50)
        text-align: center
        height px2rem(56)
        right: px2rem(0)

</style>
