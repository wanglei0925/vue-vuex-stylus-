<template>
  <div class="good-wrapper">
    <div ref="meauWrapper" class="meau-wrapper">
      <ul>
        <li class="item" v-for="(good,index) in goods" :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
         <span class="text" :class="{'current':currentIndex===index}"> <span class="icon" v-if="good.type>1"
                                                                             :class="classMap[good.type]"></span>
          {{good.name}}</span>
        </li>
      </ul>
    </div>
    <div ref="foodWrapper" class="food-wrapper">
      <ul>
        <li class="item" ref="foodList" v-for="good in goods">
          <h2 class="title"> {{good.name}}</h2>
          <ul class="food-contain">
            <li class="food-item" v-for="food in good.foods" @click.prevent.stop="foodDetail(food,$event)">
              <div  class="food-avatar">
                <img :src="food.icon" alt="">
              </div>
              <div class="food-desc">
                <div class="name">{{food.name}}</div>
                <div class="descript" v-if="food.description">
                  {{food.description}}
                </div>
                <div class="num">
                  <span class="fen">
                    月售{{food.sellCount}}份
                  </span>
                  <span class="very">
                    好评率{{food.rating}}%
                  </span>
                </div>
                <div class="price">
                  <span class="new">¥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">
                    ¥{{food.oldPrice}}
                  </span>
                </div>
              </div>
              <div class="cart-wrapper">
                <cartbutton :food="food"></cartbutton>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="cartlist">
      <cartlist :seletedFoods="seletedFoods" :minPrice="seller.minPrice"
                :deliveryPrice="seller.deliveryPrice"></cartlist>
    </div>
    <router-view></router-view>
  </div>

</template>
<script type="text/ecmascript-6">
  import cartbutton from '../cartbutton/cartbutton'
  import cartlist from '../cartlist/cartlist'
  import BSscroll from 'better-scroll'
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: []
      }
    },
    components: {
      cartbutton,
      cartlist
    },
    mounted() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'special', 'invoice']
      this._goodResult()
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    computed: {
      ...mapGetters([
        'seller'
      ]),
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      seletedFoods() {
        let foods = []
        this.goods.forEach((food) => {
          food.foods.forEach((good) => {
            if (good.count) {
              foods.push(good)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _goodResult() {
        this.$http.get('../../static/data.json').then((res) => {
          this.goods = res.data.goods
        })
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodWrapper.scrollToElement(el, 300)
      },
      _initScroll() {
        this.meauWrapper = new BSscroll(this.$refs.meauWrapper, {click: true})
        this.foodWrapper = new BSscroll(this.$refs.foodWrapper, {click: true, probeType: 3})
        this.foodWrapper.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
//        console.log(this.listHeight)
      },
      foodDetail(food, event) {
        if (!event._constructed) {
          return
        }
        this.$router.push({
          path: `/goods/food`
        })
        this.fooddetail(food)
      },
      ...mapMutations({
        fooddetail: 'SET_FOODDE'
      })
    },
    watch: {
      goods(newn) {
        if (newn) {
          setTimeout(() => {
            this._initScroll()
            this._calculateHeight()
          }, 20)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixthin'
  .good-wrapper
    position: absolute
    width: 100%
    top: px2rem(350)
    left: 0
    bottom: px2rem(92)
    box-sizing: border-box
    display: flex
    overflow: hidden
    .meau-wrapper
      flex: 0 1 px2rem(160)
      .item
        display: table
        background: #f3f5f7
        font-size: 0
        width: px2rem(160)
        box-sizing: border-box
        padding: 0 px2rem(24)
        height: px2rem(110)
        &.current
          background: #fff
        .text
          font-size: px2rem(24)
          color: #07111b
          font-weight: 200
          display: table-cell
          vertical-align: middle
          line-height: px2rem(28)
          height: px2rem(28)
          box-sizing: border-box
          /*border-bottom: 1px solid*/
          &.current
            color: #07111b
            border: none
          .icon
            width: px2rem(28)
            height: px2rem(28)
            vertical-align: middle
            background-repeat: no-repeat
            display: inline-block
            background-size: px2rem(28) px2rem(28)
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

    .food-wrapper
      flex: 1
      .title
        width: 100%
        height: px2rem(55)
        border-left: 2px solid #d9dde1
        background #f3f5f7
        padding-left: px2rem(28)
        line-height: px2rem(55)
        color: rgb(147, 153, 159)
        font-size: px2rem(24)
        box-sizing: border-box
      .food-contain
        padding: 0 px2rem(36)
        .food-item
          padding: px2rem(36) 0
          border-1px(rgba(7, 17, 27, 0.1))
          display: flex
          position: relative
          &:last-child
            border: none
          .food-avatar
            flex: 0 1 px2rem(115)
            width: px2rem(115)
            margin-right px2rem(20)
          .food-desc
            flex: 1
            .name
              font-size: px2rem(28)
              color: rgb(7, 17, 27)
              margin-bottom: px2rem(16)
              line-height: px2rem(28)
            .descript
              font-size: px2rem(20)
              margin-bottom: px2rem(16)
              line-height: px2rem(20)
              color: rgb(147, 153, 159)
            .num
              font-size: 0
              span
                display: inline-block
                font-size: px2rem(20)
                color: rgb(147, 153, 159)
                margin-bottom: px2rem(16)
                line-height: px2rem(20)
                &.very
                  margin-left: px2rem(24)
            .price
              font-size: 0
              .new
                font-size: px2rem(28)
                font-weight: normal
                line-height: px2rem(48)
                color: #f13434
              .old
                text-decoration: line-through
                color: rgb(147, 153, 159)
                font-size: px2rem(20)
                margin-left: px2rem(16)

          .cart-wrapper
            position: absolute
            right: px2rem(20)
            bottom: px2rem(20)

    .cartlist
      position: fixed
      bottom: 0
      width: 100%
      height: px2rem(92)
      left: 0
      z-index: 50
      background: #141d27

</style>
