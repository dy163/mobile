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
                    :error-message="erroes.mobile"
                />
                <van-field
                    v-model="user.code"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                    :error-message="erroes.code"
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
        code: '246810'
      },
      loginLoading: false, // 控制加载状态
      erroes: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      // this.loginLoading = true
      try {
        // 发送求之前校验登录数据
        const { mobile, code } = this.user
        const erroes = this.erroes
        if (mobile.length) {
          erroes.mobile = ''
        } else {
          erroes.mobile = '手机号不能为空'
          return
        }
        if (code.length) {
          erroes.code = ''
        } else {
          erroes.code = '密码错误'
          return
        }

        // if (!code.length) {
        //   return this.erroes.code('密码错误')
        // }
        // 表单验证通过执行
        this.loginLoading = true
        const data = await login(this.user)
        this.$store.commit('setUser', data)
        // this.$router.push({
        //   name: 'home'
        // })
        // 回到之前的页面：
        // 1. 简单粗暴的 back()，如果是手机 App 完全没问题
        // 2. 使用 url 记住来源路径
        // this.$router.back()
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)

        // this.loginLoading = true
      } catch (err) {
        console.log(err, '登录失败')
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
