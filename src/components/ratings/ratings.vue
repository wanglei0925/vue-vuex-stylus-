<template>
  <div class="ratings-wrapper" ref="ratings">
    <div class="ratings-content">
      <!--<div class="ratings-top">-->
      <!--<div class="ratings-left">-->
      <!--<div class="score"></div>-->
      <!--</div>-->
      <!--<div class="ratings-right"></div>-->
      <!--</div>-->
      <div class="ratings-list">
        <ratingselect @toggle="toggleContent" @select="selectItem" :ratings="ratings" :desc="desc"
                      :onlycontent="onlyContent" :selecttype="selectType"></ratingselect>

        <div class="rating-wrapper">
          <ul>
            <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
              <div class="avatar">
                <img  :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icxon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  <span class="item" v-for="item in rating.recommend">{{item}}</span>
                </div>
              </div>
              <div class="time">
                {{rating.rateTime | formatdate}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BSscroll from 'better-scroll'
  import ratingselect from '../ratingselect/ratingselect'
  import star from '../star/star'
  const ALL = 2
  export default{
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    mounted() {
      this._getSeller()
      setTimeout(this.$nextTick(() => {
        this._initRatins()
      }), 20)
    },
    watch: {
      ratings() {
        setTimeout(this.$nextTick(() => {
          this._initRatins()
        }), 20)
      }
    },
    components: {
      ratingselect,
      star
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      selectItem(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      _getSeller() {
        this.$http.get('./static/data.json').then((res) => {
          this.ratings = res.body.ratings
          console.log(this.ratings)
        })
      },
      _initRatins() {
        if (!this.scroll) {
          this.scroll = new BSscroll(this.$refs.ratings, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      }
    },
    computed: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixthin'
  .ratings-wrapper
    position: absolute
    top: px2rem(350)
    bottom: 0
    width: 100%
    overflow: hidden
    .ratings-content
      width: 100%
      padding-bottom: px2rem(40)
      .ratings-top
        padding: px2rem(36)
        display: flex
        .ratings-left
          text-align: center;
          height: px2rem(142)
          flex: 0 1 px2rem(240)
          width: px2rem(240)
          border-right: 1px solid rgba(7, 17, 27, 0.1)
        .ratings-right
          flex: 1
          height: px2rem(142)
      .ratings-list
        padding:px2rem(36)
        .rating-wrapper
          margin-top :px2rem(36)
          .rating-item
            display: flex
            position: relative
            .time
              position: absolute
              right:px2rem(36)
              top:px2rem(0)
              font-size:px2rem(20)
              font-weight:200
              color:rgb(147,153,159)
              line-height :px2rem(24)
            .avatar
              margin-right :px2rem(24)
              width: px2rem(56)
              flex:0 1 px2qrem(56)
              img
                width:100%
                border-radius :50%
            .content
              flex:1
              .name
                font-size:px2rem(20)
                line-height :px2rem(24)
                margin-bottom :px2rem(8)
                color:rgb(7,17,27)
              .star-wrapper
                display: flex
                font-size:0
                margin-bottom :px2rem(12)
                .delivery
                  font-size:px2rem(20)
                  margin-left :px2rem(12)
                  font-weight: 200
                  line-height :px2rem(24)
                  color:rgb(147,153,159)
              .text
                font-size:px2rem(24)
                color:rgb(7,17,27)
                line-height :px2rem(36)
                margin-bottom :px2rem(16)

              .recommend
                padding-left :px2rem(32)
                position: relative;
                .icxon
                  position: absolute
                  top: 0
                  left: 0
                  display:inline-block
                  vertical-align: top
                  font-size px2rem(24)
                  line-height :px2rem(32)
                  &.icon-thumb_up
                    font-size px2rem(24)
                    line-height :px2rem(32)
                    color: rgb(0,160,220)
                  &.icon-thumb_down
                    font-size px2rem(24)
                    line-height :px2rem(32)
                    color:rgb(183,187,191)
                .item
                  display:inline-block
                  vertical-align: top
                  font-size:px2rem(18)
                  line-height :px2rem(32)
                  padding :0 px2rem(10)
                  margin-right :px2rem(16)
                  margin-bottom :px2rem(16)
                  width:px2rem(130)
                  text-align: center
                  overflow: hidden
                  text-overflow: ellipsis
                  white-space :nowrap
                  border-radius :2px
                  background :rgb(255,255,255)
                  border:1px solid rgba(7,17,27,0.1)
</style>
