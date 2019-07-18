<template>
    <div class="article-wrap">
        <AuthInfo/>
        <CommentList/>
        <MoreAction/>
        <RecommendActicle/>
        <RecommendSearch/>
        <ReplyList/>
        <WriteComment/>
    </div>
</template>

<script>
import AuthInfo from './commponents/auth-info'
import CommentList from './commponents/comment-list'
import MoreAction from './commponents/more-action'
import RecommendActicle from './commponents/recommend-acticle'
import RecommendSearch from './commponents/recommend-search'
import ReplyList from './commponents/reply-list'
import WriteComment from './commponents/write-comment'
export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    CommentList,
    MoreAction,
    RecommendActicle,
    RecommendSearch,
    ReplyList,
    WriteComment
  },

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
