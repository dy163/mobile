<template>
    <div>
        <van-popup
            :value="value"
            @input="$emit('input', $event)"
            position="bottom"
            :style="{ height: '93%' }"
            get-container="body"
            :lazy-render="false"
        />
    </div>
</template>

<script>
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: true
    }
  },

  methods: {
    //   handeleInput (e) {
    //      console.log(e)
    //       this.$emit('input', e)
    //   }
  }
}
</script>

<style lang="less" scoped>

</style>
