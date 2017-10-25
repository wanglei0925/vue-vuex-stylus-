<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/selling">商家</router-link>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
  //  import {ERR_OK} from './api/config'
  import header from './components/header/header.vue'
  import { mapMutations } from 'vuex'
  export default{
    data () {
      return {
        seller: {}
      }
    },
    mounted () {
      this._getSeller()
    },
    components: {
      'v-header': header
    },
    methods: {
      _getSeller() {
        this.$http.get('./static/data.json').then((res) => {
          this.seller = res.body.seller
          this.sellerList(this.seller)
          console.log(this.seller)
        })
      },
      ...mapMutations({
        sellerList: 'SET_SELLER'
      })
    },
    computed: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixthin.styl'
  .tab
    display: flex
    width: 100%
    line-height: px2rem(80)
    text-align: center
    border-1px(rgba(7, 17, 27, 0.7))
    .tab-item
      flex: 1
      a
        width: 100%
        color: #333
        display: block
        text-decoration: none
        &.router-link-active {
          color: red
        }
</style>
