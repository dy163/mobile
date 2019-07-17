<template>
    <div>
        <van-search
            placeholder="请输入搜索关键词"
            v-model="searchText"
            show-action
        />
        <!-- 联想建议列表 -->
        <van-cell-group>
            <van-cell
                icon="search"
                v-for="item in suggestion"
                :title="item"
                :key="item"
            />
        </van-cell-group>
        <!-- 历史纪录 -->
        <!-- <van-cell-group>
            <van-cell title="历史纪录" icon="search">
                <van-icon
                    slot="right-icon"
                    name="search"
                    style="line-height: inherit;"
                />
            </van-cell>
        </van-cell-group> -->
    </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      suggestion: []
    }
  },
  watch: {
    searchText: debounce(async function (newVal) {
      newVal = newVal.trim() // 去除首尾空格
      if (!newVal) {
        return /// 如果为空就什么都不做
      }
      // 如果不为空,请求接口联想数据
      const data = await getSuggestion(newVal)
      this.suggestion = data.options
    }, 500)

    // async searchText (newVal) {
    //   newVal = newVal.trim() // 去除首尾空格
    //   if (!newVal) {
    //     return /// 如果为空就什么都不做
    //   }
    //   // 如果不为空,请求接口联想数据
    //   const data = await getSuggestion(newVal)
    //   this.suggestion = data.options
    // }
  }

}
</script>

<style lang="less" scoped>

</style>
