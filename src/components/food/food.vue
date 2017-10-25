<template>
  <transition name="move">
    <div class="foodetail" ref="foodetail">
      <div class="food-content">
        <div class="back" @click="back">
          <i class="icon-arrow_lift"></i>
        </div>
        <div class="food-top">
          <img class="img" :src="foodDetail.image" alt="">
        </div>
        <div class="detail">
          <h2 class="title">{{foodDetail.name}}</h2>
          <div class="num">
            <span class="span num1">月售{{foodDetail.sellCount}}份</span>
            <span class="span num2">好评率{{foodDetail.rating}}%</span>
          </div>
          <div class="price">
            <span class="newprice">{{foodDetail.price | money}}</span>
            <span v-show="foodDetail.oldPrice" class="oldprice">{{foodDetail.oldPrice |  money}}</span>
          </div>
          <div class="join">
            <transition name="fade">
              <div class="join-before" v-show="!foodDetail.count||foodDetail.count===0" @click="addfirst">加入购物车</div>
            </transition>
            <div class="join-after" v-show="foodDetail.count">
              <cartbutton :food="foodDetail"></cartbutton>
            </div>
          </div>
        </div>
        <div class="line" v-show="foodDetail.info"></div>
        <div class="intro" v-show="foodDetail.info">
          <h2 class="title">商品介绍</h2>
          <div class="text">
            {{foodDetail.info}}


          </div>
        </div>
        <div class="line" v-show="foodDetail.ratings"></div>
        <div class="rating">
          <h2 class="title">商品评价</h2>
          <div>
            <ratingselect @toggle="toggleContent" @select="selectItem" :ratings="foodDetail.ratings" :desc="desc" :onlycontent="onlyContent" :selecttype="selectType"></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="foodDetail.ratings && foodDetail.ratings.length">
                <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in foodDetail.ratings"
                    class="rating-item border-1px">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" :src="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime | formatdate}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!foodDetail.ratings || !foodDetail.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import cartbutton from '../cartbutton/cartbutton.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import BSscroll from 'better-scroll'
  const ALL = 2
  export default {
    computed: {
      ...mapGetters([
        'foodDetail'
      ])
    },
    components: {
      cartbutton,
      ratingselect
    },
    data() {
      return {
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created() {
      this._getDetail()
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BSscroll(this.$refs.foodetail, {
            click: true
          })
        })
      } else {
        this.scroll.refresh()
      }
      console.log(this.needShow())
    },
    methods: {
      selectItem(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      _getDetail() {
        if (!this.foodDetail.name) {
          this.$router.push('/goods')
        }
        console.log(this.foodDetail)
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
//          判断当前type和selectType是否相等  若相等  返回true
          return type === this.selectType
        }
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      addfirst() {
        Vue.set(this.foodDetail, 'count', 1)
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixthin'
  .foodetail
    position: fixed
    top: 0
    left: 0
    bottom: px2rem(92)
    box-sizing: border-box
    width: 100%
    z-index: 30
    height: 100%
    overflow: hidden
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .food-content
      padding-bottom: px2rem(102)
      box-sizing: border-box
      .back
        position: fixed
        top: px2rem(20)
        left: px2rem(20)
        font-size: px2rem(40)
        z-index: 50
        color: rgb(0, 160, 220)
      .food-top
        width: 100%
        height: 0
        padding-top: 100%
        position: relative
        .img
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0

      .detail
        padding: px2rem(36)
        box-sizing: border-box
        position: relative
        .title
          font-size: px2rem(28)
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: px2rem(28)
          margin-bottom: px2rem(16)
        .num
          font-size: 0
          .span
            font-size: px2rem(20)
            color: rgb(147, 153, 159)
            line-height: px2rem(20)
            display inline-block
            vertical-align: top
            margin-bottom: px2rem(36)
            &.num1
              margin-right: px2rem(24)
        .price
          font-size: 0
          .newprice
            display: inline-block
            vertical-align: top
            font-size: px2rem(28)
            font-weight: 700
            color: rgb(240, 20, 20)
            line-height: px2rem(48)
            margin-right: px2rem(24)
          .oldprice
            font-size: px2rem(20)
            font-weight: 700
            color: rgb(147, 153, 159)
            display: inline-block
            vertical-align: top
            line-height: px2rem(48)
        .join
          .join-before
            position: absolute
            bottom: px2rem(40)
            right: px2rem(48)
            z-index: 10
            width: px2rem(148)
            height: px2rem(48)
            border-radius: px2rem(24)
            color: rgb(255, 255, 255)
            font-size: px2rem(20)
            line-height: px2rem(48)
            text-align: center
            background: rgb(0, 160, 220)
            &.fade-enter-active, &.fade-leave-active
              transition: all 0.3s
            &.fade-enter-active, &.fade-leave
              opacity: 1
            &.fade-enter, &.fade-leave-active
              opacity: 0
          .join-after
            position: absolute
            bottom: px2rem(40)
            right: px2rem(48)
            z-index: 9
      .line
        background: #f3f5f7
        height: px2rem(32)
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .intro
        padding: px2rem(36)
        .title
          font-size: px2rem(28)
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: px2rem(28)
          margin-bottom: px2rem(16)
        .text
          font-size: px2rem(24)
          font-weight: 200
          color: rgba(77, 85, 93, 1)
          line-height: px2rem(48)
      .rating
        padding: px2rem(36)
        .title
          font-size: px2rem(28)
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: px2rem(28)
          margin-bottom: px2rem(16)
        .rating-wrapper
          margin-top :px2rem(24)
          .rating-item
            padding:px2rem(32) 0
            border-bottom:1px solid rgba(7,17,27,0.3)
            position: relative
            .time
              font-size:px2rem(20)
              color: rgb(147,153,159)
              line-height :px2rem(24)
            .user
              position: absolute
              right:px2rem(35)
              top:px2rem(32)
              font-size:0
              .name
                color: rgb(147,153,159)
                line-height :px2rem(24)
                display :inline-block
                vertical-align: top
                font-size:px2rem(20)
              .avatar
                width:px2rem(24)
                border-radius: 50%
                height:px2rem(24)
                display: inline-block
                vertical-align: top
                margin-left :px2rem(12)
            .text
              font-size:px2rem(24)
              color:rgb(7,17,27)
              line-height :px2rem(32)
              .icon-thumb_up
                font-size:px2rem(24)
                color: rgb(0,160,220)
                line-height px2rem(48)
                margin-right :px2rem(12)
              .icon-thumb_down
                font-size:px2rem(24)
                color: rgb(147,153,159)
                margin-right :px2rem(12)
                line-height px2rem(48)
</style>
