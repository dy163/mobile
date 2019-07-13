<template>
    <div>
      <!-- 头部 -->
      <van-nav-bar title="首页" fixed class="van-nav-bar-heade"/>
      <!-- 频道标签 -->
      <van-tabs v-model="activeChannelIndex" class="channel-tabs">
        <div slot="nav-right" class="nav-icon" @click="isChannelShow = true">
          <van-icon name="bars" />
        </div>
        <van-tab
        :title="channelsItem.name"
        v-for="channelsItem in channels"
        :key="channelsItem.id"
        class="tab-list">
          <van-pull-refresh
          :success-text="channelsItem.downPullSuccessText"
          :success-duration="1000"
          v-model="channelsItem.downPullLoading"
          @refresh="onRefresh">
            <van-list
              v-model="channelsItem.upPullLoading"
              :finished="channelsItem.upPullFinished"
              finished-text="没有更多了"
              @load="onLoad">
            <van-cell
              v-for="articleItem in channelsItem.articles"
              :key="articleItem.art_id"
              :title="articleItem.title"
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
      <!-- 频道组件 -->
      <home-channel v-model="isChannelShow"/>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import { getArticles } from '@/api/article'
import HomeChannel from './components/channel'
export default {
  name: 'HoemIndex',
  components: {
    HomeChannel
  },
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      pullIsLoading: false,
      channels: [], // 存储频道列表
      isChannelShow: false // 控制频道面板的显示状态
    }
  },

  computed: {
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },

  watch: {
    // 监视容器中的user用户
    // 记住: 凡是能 this. 点出来的成员都可以在这里监视
    async '$store.state.user' () {
      console.log('user 变了')
      await this.loadChannels()
      // 由于重新加载了视频数据,所以频道被清空了
      // 而且上拉加载没有更多的onload 没有主动触发
      this.activeChannel.upPullLoading = true
      this.onLoad()
    }
  },

  async created () {
    console.log('组件重新 created 渲染了')
    // 加载频道列表
    await this.loadChannels()
  },

  methods: {
    // async loadChannels () {
    //   let channels = []
    //   const { user } = this.$store.state
    //   // 如果已登录请求用户列表数据
    //   if (user) {
    //     channels = (await getUserChannels()).channels
    //   } else {
    //   // 没有登录就请求默认的登录数据
    //     const localChannels = JSON.parse(window.localStorage.getItem('channels'))
    //     if (localChannels) {
    //       channels = localChannels
    //     } else {
    //     // 如果没有,则请求获取推荐的的默认频道列表
    //       channels = (await getUserChannels()).channels
    //     }
    //   }
    //   // 修改channels 使这个数据结构满足我们的使用需求
    //   channels.forEach(item => {
    //     item.articles = [] // 用来存储当前的文章列表
    //     item.timestamp = Date.now() // 存储下一页的时间戳
    //     item.downPullLoading = false // 控制当前频道的下拉刷新的loading状态
    //     item.upPullLoading = false // 控制上拉的 loading 状态
    //     item.upPullFinished = false // 控制当前频道数据是否加载完毕
    //   // item.upPullFinished = false //
    //   })
    //   this.channels = channels
    // },
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
      // 修改channels 使这个数据结构满足我们的使用需求
      channels.forEach(item => {
        item.articles = [] // 用来存储当前的文章列表
        item.timestamp = Date.now() // 存储下一页的时间戳
        item.downPullLoading = false // 控制当前频道的下拉刷新的loading状态
        item.upPullLoading = false // 控制上拉的 loading 状态
        item.upPullFinished = false // 控制当前频道数据是否加载完毕
        // item.upPullFinished = false //
      })

      this.channels = channels
    },
    // 上拉加载更多 push 数据
    async onLoad () {
      await this.$sleep(800)
      let data = []
      data = await this.loadArticles()

      /**
       * pre_timestamp 时间戳表示下一页的数据
       * results 是显示文章的
       */
      if (!data.pre_timestamp && !data.results.length) {
      // 设置当前频道数据加载完毕组件会自动给出提示,并且不在加载onload
        this.activeChannel.upPullFinished = true

        this.activeChannel.upPullLoading = false
        // 不住往后执行了
        return
      }
      // 没有数据加载上一页的数据
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp
        // 加载下一页的数据, 将 pre_timestamp 更新到当前频道中用于加载下一页数据
        data = await this.loadArticles()
      }

      // 数据加载好以后
      this.activeChannel.timestamp = data.pre_timestamp

      // 将文章更新到频道中(注意不要赋值 是push 到最上面)
      this.activeChannel.articles.push(...data.results)

      // 数据加载完毕取消加载状态的loading
      this.activeChannel.upPullLoading = false

      console.log(data)
    },
    // 下拉加载更多 重置数据
    async onRefresh () {
    // 单独拿出来activeChannel
      const { activeChannel } = this
      // 备份加载下一页的时间戳
      const timestamp = activeChannel.timestamp
      // 获取最新的数据
      activeChannel.timestamp = Date.now()
      const data = await this.loadArticles()

      // 如果有最新数据
      if (data.results.length) {
      // 重置最新的推荐列表更新到文章列表中
        activeChannel.articles = data.results
        // 由于你重置了文章列表,那么当前数据中的 pre_timestamp 就是下拉加载更多的下一页数据的时间戳
        activeChannel.timestamp = data.pre_timestamp
        activeChannel.downPullSuccessText = '更新成功'
        this.onLoad()
      } else {
      // 如果没有最新数据,提示
        activeChannel.downPullSuccessText = '已是最新数据'
      }
      // 下拉刷新取消loading状态
      activeChannel.downPullLoading = false

      activeChannel.timestamp = timestamp

    // setTimeout(() => {
    //   this.$toast('刷新成功')
    //   this.pullIsLoading = false
    // }, 500)
    },

    async loadArticles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 当前的频道的id
        timestamp, // 当前最新的时间
        withTop: 1 // 是否包含置顶的数据
      })
      return data
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
.nav-icon {
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  // opacity: .6;
}
</style>
