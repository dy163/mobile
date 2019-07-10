<template>
    <div>
      <!-- 头部 -->
      <van-nav-bar title="首页" fixed class="van-nav-bar-heade"/>
      <!-- 频道标签 -->
      <van-tabs v-model="activeChange" sticky>
        <van-tab title="标签 1" class="tab-list">
          <van-pull-refresh v-model="pullIsLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
            </van-list>
          </van-pull-refresh>

        </van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs>
      <!-- 底部导航 -->
      <van-tabbar>
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="qa">问答</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="video">视频</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="me">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HoemIndex',
  data () {
    return {
      activeChange: 0,
      list: [],
      loading: false,
      finished: false,
      pullIsLoading: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.pullIsLoading = false
      }, 500)
    }
  }
}
</script>

<style lang='less' scoped>
.van-tabs {

}
.van-nav-bar-heade {
  background-color: #8ecce9;
}
</style>
