<template>
  <div class="detail" v-show="flagdetail">
    <div class="detail-wrapper">
      <div class="detail-main">
        <div class="title">{{seller.name}}</div>
        <div class="star-wrapper">
          <star :score="seller.score" :size="48"></star>
        </div>
        <div class="line-title">
          <span class="line"></span>
          <span class="text">优惠信息</span>
          <span class="line"></span>
        </div>
        <div class="detail-list">
          <ul>
            <li class="item" v-for="(item,index) in seller.supports">
              <span class='icon' :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <div class="line-title">
          <span class="line"></span>
          <span class="text">商家公告</span>
          <span class="line"></span>
        </div>
        <div class="desc">
          {{seller.bulletin}}
        </div>
      </div>
    </div>
    <div class="close">
      <i class="icon-close" @click="close"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { mapMutations, mapGetters } from 'vuex'
  import star from '../star/star'
  export default{
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    computed: {
      ...mapGetters([
        'flagdetail'
      ])
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'special', 'invoice']
    },
    data() {
      return {}
    },
    methods: {
      close() {
        this.detail(false)
      },
      ...mapMutations({
        detail: 'SET_DETAIL'
      })
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixthin.styl'
  .detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(7, 17, 27, 0.8)
    z-index: 1000
    overflow: auto
    .detail-wrapper
      min-height: 100%
      width: 100%
      .detail-main
        padding-top: px2rem(128)
        padding-bottom: px2rem(128)
        .title
          font-size: px2rem(32)
          line-height: px2rem(32)
          font-weight: 700
          text-align: center
          color: rgb(255, 255, 255)
        .star-wrapper
          display: table
          margin: px2rem(32) auto px2rem(56)
        .line-title
          width: 80%
          margin: 0 auto px2rem(48)
          display: flex
          .line
            flex: 1
            height: px2rem(15)
            margin-top: px2rem(16)
            border-top: 1px solid rgb(255, 255, 255, 0.2)
          .text
            margin: 0 px2rem(40)
            font-size: px2rem(32)
            line-height: px2rem(32)
            font-weight: 700
            color: rgb(255, 255, 255)
        .detail-list
          color: #fff
          padding :0 px2rem(96)
          box-sizing :border-box
          margin-bottom :px2rem(56)
          .item
            font-size:0
            margin-bottom :px2rem(24)
            .icon
              vertical-align :top
              display: inline-block
              width:px2rem(32)
              height :px2rem(32)
              margin-right :px2rem(30)
              background-repeat:no-repeat
              background-size:px2rem(32) px2rem(32)
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
              vertical-align :top
              font-size:px2rem(24)
              line-height :px2rem(32)
        .desc
          color: #fff
          padding :0 px2rem(96)
          font-size :px2rem(24)
          line-height :px2rem(48)
    .close
      position: relative
      clear: both
      font-size: px2rem(64)
      margin: px2rem(-128) auto 0 auto
      width: px2rem(64)
      height: px2rem(64)
      color: rgba(255, 255, 255, 0.8)
      text-align: center;
</style>
