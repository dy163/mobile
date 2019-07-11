<template>
    <div>
      <!-- 头部 -->
      <van-nav-bar title="首页" fixed class="van-nav-bar-heade"/>
      <!-- 频道标签 -->
      <van-tabs v-model="activeChange" class="channel-tabs">
        <van-tab
        :title="channelsItem.name"
        v-for="channelsItem in channels"
        :key="channelsItem.id"
        class="tab-list">
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
import { getUserChannels } from '@/api/channels'
export default {
  name: 'HoemIndex',
  data () {
    return {
      activeChange: 0,
      list: [],
      loading: false,
      finished: false,
      pullIsLoading: false,
      channels: [] // 存储频道列表
    }
  },

  created () {
    this.loadChannels()
  },

  methods: {
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      if (user) {
        // 如果用户已经登录
        const data = await getUserChannels()
        console.log(data)
        channels = data.channels
      } else {
        // 没有登录
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localChannels) {
          channels = localChannels
        } else {
          const data = await getUserChannels()
          channels = data.channels
        }
      }
      this.channels = channels
    },

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
.channel-tabs {
  margin-bottom: 100px;
}
// /deep/ 的作用（深度作用选择器）
// 参考文档：https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
// 注意：你在页面上测量的是设备像素，我们的样式规则转换是基于 75 进行转换的，所以在这里写的时候都 * 2
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 92px;
}
.van-nav-bar-heade {
  background-color: #8ecce9;
}
</style>
