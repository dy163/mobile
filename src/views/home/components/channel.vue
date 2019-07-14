<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '93%' }"
    get-container="body"
    :lazy-render="false"
  >
  <!-- 我的频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(item, index) in userChannels"
          :key="item.id"
          @click="handleUserChannelClick(item, index)"
        >
          <span
            class="text"
            :class="{ active: index === activeIndex && !isEdit }"
          >{{ item.name }}</span>
          <van-icon class="close-icon" v-show="isEdit" name="close" />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /我的频道 -->

    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          @click="handleAddChannel(item)"
        >
          <div class="info">
            <span class="text">{{ item.name }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /推荐频道 -->
  </van-popup>

</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userChannels: {
      type: Array,
      default: function () {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      show: true,
      allChannels: [],
      isEdit: false
    }
  },

  computed: {
    /**
     * 这里放计算属性与处理获取的推荐数据(不包含所有数据的其他数据)
     */
    recommendChannels () {
      // 拿到所有重复的id
      const duplicates = this.userChannels.map(item => item.id)
      return this.allChannels.filter(item => !duplicates.includes(item.id))
    }
  },

  created () {
    this.loadAllChannels()
  },

  methods: {
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        console.log(data)
        // 将获取的数据统一处理成我们需要的格式
        data.channels.forEach(item => {
          item.articles = [] // 用来存储当前的文章列表
          item.timestamp = Date.now() // 存储下一页的时间戳
          item.downPullLoading = false // 控制当前频道的下拉刷新的loading状态
          item.upPullLoading = false // 控制上拉的 loading 状态
          item.upPullFinished = false // 控制当前频道数据是否加载完毕
          // item.upPullFinished = false //
        })
        this.allChannels = data.channels
      } catch (err) {

      }
    },

    handleAddChannel (item) {
      const channels = this.userChannels.slice(0)
      channels.push(item)
      this.$emit('update:user-channels', channels)

      // 如果已经登录
      const { user } = this.$store.state

      if (user) {

      } else {
        // 没有登录
        // const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        // // 如果本地存储有频道列表,则添加到本地存储
        // if (localChannels) {
        //   localChannels = this.userChannels
        // }
        window.localStorage.setItem('channels', JSON.stringify(channels))
      }
    },

    handleUserChannelClick (item, index) {
      try {
        // 如果是非编辑的状态,是切换tab显示
        if (!this.isEdit) {
          this.$emit('update:active-index', index)
          this.$emit('input', false)
          return
        }
        // 如果是编辑状态,则是删除操作
      } catch (error) {
        console.log('修改失败')
      }
    }
    //   handeleInput (e) {
    //      console.log(e)
    //       this.$emit('input', e)
    //   }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    // .action {}
  }
  .channel-content {
    .text {
      font-size: 24px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 40px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
