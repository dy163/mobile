<template>
    <div class="login-wrap">
        <!-- 头部 -->
        <van-nav-bar title="登录"/>
        <!-- 表单区域 -->
        <form>
            <van-cell-group>
                <van-field
                    v-model="user.mobile"
                    required
                    clearable
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="user.code"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />
            </van-cell-group>
            <div class="but">
                <van-button
                type="info"
                class="btn"
                @click.prevent="handleLogin"
                :loading="loginLoading"
                loading-text="loading...">登录</van-button>
            </div>
        </form>
    </div>

</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '18636235298',
        code: '123456'
      },
      loginLoading: false
    }
  },
  methods: {
    async handleLogin () {
      this.loginLoading = true
      try {
        const data = await login(this.user)
        this.$store.commit('setUser', data)
        this.$router.push({
          name: 'home'
        })
        // this.loginLoading = true
      } catch (err) {
        console.log(err)
        this.$message.error('登录失败')
      }
      this.loginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
    background-color: #5d6cf8;
}
.but {
    padding: 20px;
    .btn {
        width: 100%;
    }
}
</style>
