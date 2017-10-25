<template>
  <div class="cart-wrapper">
    <div class="contnet" @click="toggleList">
      <div class="cart-left">
        <div class="cart-car">
          <div class="num" v-show="totalcount>0">{{totalcount}}</div>
          <div class="cart-inner" :class="{'current':totalcount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="totalprice" :class="{'current':totalcount>0}">
          ¥{{totalPrice}}
        </div>
        <div class="pei">
          另需配送费¥4元
        </div>
      </div>
      <div class="cart-right" :class="{'current':minPrice - totalPrice<0}">
        <span> {{paydesc}}</span>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="fold">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in seletedFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartbutton :food="food"></cartbutton>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade"><div class="fixed-zhao" v-show="fold" @click="fold=!fold"></div></transition>

  </div>
</template>
<script type="text/ecmascript-6">
  import cartbutton from '../cartbutton/cartbutton'
  import BSscroll from 'better-scroll'
  export default {
    props: {
      seletedFoods: {
        type: Array,
        return: {
          default: {}
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        fold: false
      }
    },
    components: {
      cartbutton
    },
    computed: {
      totalcount() {
        let allcount = 0
        this.seletedFoods.forEach((item) => {
          allcount += item.count
        })
        return allcount
      },
      totalPrice() {
        let total = 0
        this.seletedFoods.forEach((item) => {
          total += item.count * item.price
        })
        return total
      },
      paydesc() {
        if (this.totalcount === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `¥${diff}元起送`
        } else {
          return `去结算`
        }
      }
    },
    methods: {
      toggleList() {
        if (!this.totalcount) {
          return
        }
        this.fold = !this.fold
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BSscroll(this.$refs.listContent, {click: true, probeType: 3})
          } else {
            this.scroll.refresh()
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixthin'
  .cart-wrapper
    height: px2rem(92)
    position: relative
    z-index:100
    .contnet
      display: flex
      height: px2rem(92)
      position :relative
      z-index:60
      .cart-left
        flex: 1
        display: flex
        background :#131d26
        .cart-car
          width: px2rem(110)
          height: px2rem(110)
          flex: 0 1 px2rem(110)
          border-radius: 50%
          box-sizing: border-box
          position: relative
          padding: px2rem(16)
          background: #131d26
          margin-left: px2rem(36)
          margin-top: px2rem(-24)
          .num
            position: absolute
            top: 0
            right: 0
            height: px2rem(32)
            line-height: px2rem(32)
            border-radius: px2rem(20)
            padding: 0 px2rem(20)
            background: #f01414
            color: #ffffff
            font-size: px2rem(24)
          .cart-inner
            width: 100%
            height: 100%
            line-height: px2rem(78)
            border-radius: 50%
            background: #2b343c
            font-size: px2rem(46)
            text-align: center
            color: #80858a
            &.current
              background: #00a0dc
              color: #fff
        .totalprice
          color: rgba(255, 255, 255, 0.1)
          font-size: px2rem(30)
          margin: px2rem(24) px2rem(24) px2rem(24) 0
          min-width: px2rem(100)
          text-align: center
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          line-height: px2rem(44)
          &.current
            color: #fff
        .pei
          font-size: px2rem(24)
          line-height: px2rem(92)
          color: rgba(255, 255, 255, 0.2)
      .cart-right
        flex: 0 1 px2rem(210)
        height: 100%
        width: px2rem(210)
        display: table
        vertical-align: middle
        background: #2b333b
        text-align: center
        color: rgba(255, 255, 255, 0.4)
        &.current
          background: #00a0dc
          color: #fff
        span
          display: table-cell
          vertical-align: middle
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index:45
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition :all 0.3s
      &.fold-enter,&.fold-leave-active
        transform: translate3d(0, 0%, 0)
      .list-header
        position: relative
        height: px2rem(80)
        padding: 0 px2rem(36)
        background: #f3f5f7
        font-size: px2rem(28)
        color: rgb(7, 17, 27)
        font-weight: 200
        line-height: px2rem(80)
        .empty
          position: absolute
          top: 0
          font-size: px2rem(24)
          line-height: px2rem(80)
          color: rgb(0, 160, 220)
          right: px2rem(36)
      .list-content
        max-height: px2rem(440)
        background: #fff
        overflow: hidden
        .food
          height: px2rem(96)
          padding: px2rem(24) px2rem(210) px2rem(24) px2rem(36)
          box-sizing: border-box
          position: relative
          .name
            font-size: px2rem(28)
            color: rgb(7, 17, 27)
            line-height: px2rem(48)
            float: left
          .price
            float: right
            color: rgb(240, 20, 20)
            font-weight: normal
            line-height: px2rem(48)
          .cartcontrol-wrapper
            position: absolute
            top: px2rem(24)
            right: px2rem(24)
    .fixed-zhao
      position :fixed
      top:0
      bottom:0
      width:100%
      height:100%
      z-index: 40
      background :rgba(0,0,0,0.3)
      &.fade-enter-active,&.fade-leave-active
        transition :all 0.5s
      &.fade-enter,&.fade-leave-active
        opacity :0
        background: rgba(7, 17, 27, 0)
</style>
