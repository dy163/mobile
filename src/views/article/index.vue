<template>
    <div class="article-wrap">
        <van-nav-bar
            title="头条"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
        />
        <h4 class="article-title">{{ article.title }}</h4>
        <AuthInfo
          class="auth-info"
          :article="article"
        />
        <div class="ariticle-content" v-html="article.content"></div>
        <!-- <AuthInfo/> -->
        <MoreAction :article="article"/>
        <!-- <CommentList :article-id="$route.params.articleId" /> -->
        <CommentList
        :source="$route.params.articleId.toString()"
         @is-replylist-show="handleIsReplyListShow"/>
        <!-- <RecommendActicle/> -->
        <!-- <RecommendSearch/> -->
        <ReplyList
          v-model="isReplyListShow"
          :comment-id="commentId"
        />
        <WriteComment/>
    </div>
</template>

<script>
import AuthInfo from './commponents/auth-info'
import CommentList from './commponents/comment-list'
import MoreAction from './commponents/more-action'
// import RecommendActicle from './commponents/recommend-acticle'
// import RecommendSearch from './commponents/recommend-search'
import ReplyList from './commponents/reply-list'
import WriteComment from './commponents/write-comment'
import { getArticleDetail } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    CommentList,
    MoreAction,
    // RecommendActicle,
    // RecommendSearch,
    ReplyList,
    WriteComment
  },

  data () {
    return {
      article: {
        art_id: '',
        attitude: null,
        aut_id: '',
        aut_name: '',
        aut_photo: '',
        ch_id: 13,
        content: '',
        is_collected: false,
        is_followed: false,
        pubdate: '',
        recomments: [],
        title: ''
      },
      isReplyListShow: false, // 控制回复组件的显示状态
      commentId: null // 点击回复的评论 id
    }
  },

  created () {
    this.loadArticleDetail()
  },

  deactivated () {
    this.$destroy()
  },

  methods: {
    async loadArticleDetail () {
      try {
        const data = await getArticleDetail(this.$route.params.articleId)
        this.article = data
      } catch (err) {
        console.log(err)
      }
    },

    handleIsReplyListShow (id) {
      this.commentId = id
      this.isReplyListShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.article-wrap {
  padding: 20px;
}
.auth-info {
  position: sticky;
  top: 0;
  background-color: #fff;
   z-index: 10;
}
</style>
