<template>
  <div class="seller-wrapper" ref="sellerwrapper">
    <div class="seller-top">
      <div class="seller-detail">
        <div class="seller-left">
          <div class="seller-title">{{seller.name}}</div>
          <div class="rating-score">
            <star :score="seller.score" :size="36"></star>
            <div class="num">月售{{seller.sellCount}}单</div>
          </div>
        </div>
        <div class="seller-right">
          <span @click="setfavorite" class="fa-icon icon-favorite" :class="{'curren':favorite}"></span>
          <span class="fa-text">{{favoriteText}}</span>
        </div>
      </div>
      <div class="munmoney">
        <div class="item">
          <div class="text">起送价</div>
          <div class="mon">{{seller.minPrice}}











            <small>元</small>
          </div>
        </div>
        <div class="item">
          <div class="text">商家配送</div>
          <div class="mon">{{seller.deliveryPrice}}



















            <small>元</small>
          </div>
        </div>
        <div class="item">
          <div class="text">平均配送时间</div>
          <div class="mon">{{seller.deliveryTime}}



















            <small>分钟</small>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="dullent">
        <div class="dullent-titile">
          公告与活动




















        </div>
        <div class="text-wrapper">
          {{seller.bulletin}}



















        </div>
        <ul class="icon-wrapper" v-show="seller.supports">
          <li class="item" v-for="(item,index) in seller.supports">
            <span class='icon' :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <div class="split"></div>
      <div class="pics">
        <div class="pics-title">商家实景</div>
        <div class="pics-wrapper" ref="picswrapper">
          <ul class="pics-list" ref="picList">
            <li ref="picsitem" class="pics-item" v-for="url in seller.pics">
              <img class="image" :src="url" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="split"></div>
      <div class="infos">
        <div class="infos-titile">商家信息</div>
        <ul>
          <li class="infos-item" v-for="item in seller.infos">
            {{item}}




          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BSscroll from 'better-scroll'
  import star from '../star/star'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'seller'
      ]),
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    components: {
      star
    },
    watch: {
      seller() {
        setTimeout(this.$nextTick(() => {
          this._initScroll()
          this._initPics()
        }), 20)
      }
    },
    data() {
      return {
        all: 0,
        favorite: false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
      setTimeout(this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      }), 20)
    },
    methods: {
      setfavorite() {
        this.favorite = !this.favorite
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BSscroll(this.$refs.sellerwrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPics() {
        let picwidth = this.$refs.picsitem
        for (let i = 0; i < picwidth.length; i++) {
          this.all += picwidth[i].clientWidth
        }
        this.$refs.picList.style.width = this.all + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BSscroll(this.$refs.picswrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
//              允许在横向滚动的同时纵向滚动
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixthin'
  .seller-wrapper
    position: absolute
    top: px2rem(350)
    bottom: 0
    width: 100%
    overflow: hidden
    .seller-top
      padding-bottom: px2rem(40)
      .seller-detail
        margin: px2rem(36)
        box-sizing: border-box
        display: flex
        border-bottom: 1px solid rgba(7, 17, 27, 0.3)
        .seller-left
          flex: 1
          .seller-title
            font-size: px2rem(28)
            color: rgb(7, 17, 27)
            line-height: px2rem(28)
          .rating-score
            display: flex
            margin: px2rem(16) 0 px2rem(36)
            .num
              margin-left: px2rem(20)
              font-size: px2rem(20)
              color: rgb(77, 85, 93)
              line-height: px2rem(36)
        .seller-right
          width: px2rem(65)
          flex: 0, 1, px2rem(65)
          .fa-text
            margin-top :px2rem(8)
            display: block
            text-align center
            font-size: px2rem(20)
            color: rgb(77, 85, 93)
            line-height: px2rem(20)
          .fa-icon
            display: block
            text-align center
            width: px2rem(48)
            margin: 0 auto
            font-size: px2rem(48)
            line-height: px2rem(48)
            color: #d4d6d9
            &.curren
              color: rgb(240, 20, 20)
      .munmoney
        display: flex
        padding-top: px2rem(36)
        padding-bottom: px2rem(36)
        .item
          width: 33.333333333333333333%
          flex: 0, 1, 33.3333333333333333%
          border-left: 1px solid rgba(7, 17, 27, 0.3)
          &:first-child
            border: none
          .text
            font-size: px2rem(20)
            color: rgb(147, 153, 159)
            line-height: px2rem(20)
            text-align: center
            margin-bottom: px2rem(8)
          .mon
            font-size: px2rem(48)
            font-weight: 200
            color: rgb(7, 17, 27)
            text-align: center
            line-height: px2rem(48)
            small
              font-size: px2rem(20)
      .split
        height: px2rem(35)
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.3)
        border-top: 1px solid rgba(7, 17, 27, 0.3)
      .dullent
        padding: px2rem(36)
        box-sizing: border-box
        .dullent-titile
          margin-bottom: px2rem(36)
          font-size: px2rme(28)
          color: rgb(7, 17, 27)
          line-height: px2rem(28)
        .text-wrapper
          padding: 0 px2rem(24) px2rem(24) px2rem(24)
          box-sizing: border-box
          font-size: px2rem(24)
          font-weight: 200
          color: rgb(240, 20, 20)
          line-height: px2rem(48)
        .icon-wrapper
          .item
            color: rgb(7, 17, 27)
            border-top: 1px solid rgba(7, 17, 27, 0.3)
            padding: px2rem(32) px2rem(24)
            font-size: 0
            .icon
              display: inline-block
              vertical-align: top
              margin-right: px2rem(12)
              width: px2rem(32)
              height: px2rem(32)
              background-size: px2rem(32) px2rem(32)
              &.decrease
                bg-image(decrease_3)
              &.discount
                bg-image(discount_3)
              &.guarantee
                bg-image(guarantee_3)
              &.special
                bg-image(special_3)
              &.invoice
                bg-image(invoice_3)
            .text
              display: inline-block
              vertical-align: middle
              font-size px2rem(24)
              font-weight: 200
              line-height: px2rem(32)
      .pics
        padding: px2rem(36)
        box-sizing: border-box
        .pics-title
          margin-bottom: px2rem(36)
          font-size: px2rme(28)
          color: rgb(7, 17, 27)
          line-height: px2rem(28)
        .pics-wrapper
          width: 100%
          white-space: nowrap
          overflow: hidden
          .pics-list
            font-size: 0
            .pics-item
              display: inline-block
              width: px2rem(252)
              height: px2rem(180)
              -webkit-box-sizing: border-box
              -moz-box-sizing: border-box
              box-sizing: border-box
              padding-right: px2rem(12)
              &:last-child
                width: px2rem(240)
                padding-right: 0
              .image
                width: 100%
                height: 100%
      .infos
        padding: px2rem(36)
        box-sizing: border-box
        .infos-titile
          margin-bottom: px2rem(36)
          font-size: px2rme(28)
          color: rgb(7, 17, 27)
          line-height: px2rem(28)
        .infos-item
          font-size: px2rem(24)
          padding: px2rem(32) px2rem(24)
          font-weight: 200
          color: rgb(7, 17, 27)
          line-height: px2rem(32)
          border-top: 1px solid rgba(7, 17, 27, 0.1)
</style>

