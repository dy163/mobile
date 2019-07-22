<template>
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/me">{{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item>
      <!-- <van-tabbar-item icon="setting-o" to="/me">我的</van-tabbar-item> -->
    </van-tabbar>
</template>

<script>
export default {
  name: 'AppTabbar',
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
