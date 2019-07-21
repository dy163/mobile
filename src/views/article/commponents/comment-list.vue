<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in comments"
        :key="item.com_id.toString()"
      >
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{ item.aut_name }}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞 {{ item.like_count }}</van-button>
        </div>
        <div slot="label">
          <p>{{ item.content }}</p>
          <p>
            <span>{{ item.pubdate | relativeTime }}</span>
            ·
            <span @click="$emit('is-replylist-show', item.com_id.toString())">回复 {{ item.reply_count }}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'

export default {
  name: 'CommentList',
  props: {
    /**
     * 数据id，文章id 或是 评论 id
     */
    source: {
      type: [Number, String],
      required: true
    },
    /**
     * source 是否是文章，默认当作文章
     */
    isArticle: {
      type: Boolean,
      default: true
    }

    // articleId: {
    //   type: [Number, String]

    // },
    // commentId: {
    //   type: [Number, String]
    // }
  },

  data () {
    return {
      // list: [],
      comments: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      const data = await getComments({
        // source: this.articleId || this.commentId,
        source: this.source,
        offset: this.offset,
        limit: this.limit,
        // isArticle: !!this.articleId
        isArticle: this.isArticle // 获取文章评论？还是获取评论的回复
      })
      console.log(data)
      // 如果数组为空,则表示没有数据了
      if (!data.results.length) {
        this.finished = true
        this.loading = false
        return
      }

      // 如果有数据, 添加数据
      this.comments.push(...data.results)

      // 将本次的loading设置为false
      this.loading = false
      // 将本次拿的的lastid 保存起来,加载下一页数据
      this.offset = data.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
