<template>
  <div class="rating-wrapper">
    <div class="content">
      <span @click="select(2,$event)" class="item all" :class="{'current':selecttype===2}">{{desc.all}} <span
        v-show="ratings">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="item positive" :class="{'current':selecttype===0}">{{desc.positive}}
<span v-show="positives">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="item negative" :class="{'current':selecttype===1}">{{desc.negative}}
<span v-show="negatives">{{negatives.length}}</span>
</span>
    </div>
    <div class="icon-wrapper" @click="toggleContent">
      <i class="icon icon-check_circle" :class="{'current':onlycontent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
  export default {
    props: {
      desc: {
        type: Object,
        return: {
          default: {
            all: '全部',
            positive: '推荐',
            negative: '不满意'
          }
        }
      },
      selecttype: {
        type: Number,
        default: ALL
      },
      onlycontent: {
        type: Boolean,
        default: false
      },
      ratings: {
        type: Array,
        return: {
          default: {}
        }
      }
    },
    mounted() {
      console.log(this.selecttype)
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('select', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('toggle')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixthin'
  .rating-wrapper
    .content
      font-size: 0
      padding: px2rem(0 36)
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      padding: px2rem(24) 0 px2rem(36)
      margin-bottom: px2rem(24)
      border-bottom: 1px solid rgba(7, 17, 27, 0.2)
      .item
        font-size: px2rem(24)
        display: inline-block
        margin-right: px2rem(16)
        width: px2rem(120)
        height: px2rem(65)
        text-align: center
        line-height: px2rem(65)
        border-radius: px2rem(2)
        &.all
          background: #ccecf8
          color: rgb(77, 85, 93)
        &.positive
          background: #ccecf8
          color: rgb(77, 85, 93)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          color: rgb(77, 85, 93)
        &.current
          background: rgba(0, 160, 220, 1)
          color: rgb(255, 255, 255)
    .icon-wrapper
      font-size: 0
      line-height: px2rem(48)
      padding-bottom: px2rem(24)
      border-bottom: 1px solid rgba(7, 17, 27, 0.2)
      .icon
        display: inline-block
        vertical-align: top
        font-size: px2rem(48)
        line-height: px2rem(48)
        color: rgb(147, 153, 159)
        &.current
          color: rgba(0, 160, 220, 1)
      .text
        display: inline-block
        vertical-align: top
        font-size: px2rem(24)
        margin-left: px2rem(15)

</style>
