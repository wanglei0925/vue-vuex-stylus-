<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      score: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 24
      }
    },
    computed: {
      starType() {
        return `star-${this.size}`
      },
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixthin.styl'
  .star
    &.star-48
      .star-item
        display: inline-block
        background-repeat: no-repeat
        width: px2rem(40)
        height: px2rem(38)
        background-size: px2rem(40) px2rem(38)
        margin-right: px2rem(38)
        &:last-child
          margin-right: 0
        &.on
          bg-image(star48_on)
        &.half
          bg-image(star48_half)
        &.off
          bg-image(star48_off)
    &.star-36
      .star-item
        display: inline-block
        background-repeat: no-repeat
        width: px2rem(30)
        height: px2rem(30)
        background-size: px2rem(30) px2rem(30)
        margin-right: px2rem(12)
        &.on
          bg-image(star36_on)
        &.half
          bg-image(star36_half)
        &.off
          bg-image(star36_off)
    &.star-24
      .star-item
        display: inline-block
        background-repeat: no-repeat
        width: px2rem(20)
        height: px2rem(20)
        background-size: px2rem(20) px2rem(20)
        margin-right: px2rem(6)
        &.on
          bg-image(star24_on)
        &.half
          bg-image(star24_half)
        &.off
          bg-image(star24_off)


</style>
