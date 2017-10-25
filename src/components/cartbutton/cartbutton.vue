<template>
  <div class="cartbutton-wrapper">
    <div v-if="food.count" class="item desc" @click.stop="desc">
      <i class="icon-remove_circle_outline"></i>
    </div>
    <div v-if="food.count>0" class="text">{{food.count}}</div>
    <div class="item add" @click.stop="add">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object,
        return: {
          default: {}
        }
      }
    },
    methods: {
      desc() {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      },
      add() {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixthin'
  .cartbutton-wrapper
    display: flex
    .item
      height: px2rem(48)
      width: px2rem(48)
      text-align: center
      line-height: px2rem(48)
      font-size: px2rem(40)
      color: #00a0dc
    .text
      font-size: px2rem(20)
      line-height: px2rem(48)
      margin: 0 px2rem(20)
      color: rgb(147, 153, 159)

</style>
