<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <div>
    <!-- van-form整体表单组件
    @submit -> 自定义事件(提交事件)

    van-field 输入框 (表单一项)
    1.输入框name属性 ="用户名"
    表单整体提交时，默认收集一个提交对象
    往后台发送 参数名就是name里的值 {"用户名":'页面值'}
    2.label属性  输入框左侧文本
    3.rules属性配置检验规则
    :属性名="表达式" (动态的)
    属性名="字符串"  (静)
    -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="monile"
        required
        label="手机号"
        placeholder="请输入11位手机号"
        :rules="[{ required: true, message: '请填写正确手机号',pattern:/^1[3-9]\d{9}$/ }]"
      />
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        required
        label="密码"
        placeholder="请输入6位密码"
        :rules="[{ required: true, message: '请填写密码',pattern:/^\d{6}$/ }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :disabled="isLoading"
        :loading="isLoading" loading-text="正在登录ing">登录</van-button>
      </div>
</van-form>
    </div>
  </div>
</template>

<script>
/* 写需求套路
      1.html+css
      2。数据铺设，数据绑定，数据微调
      3.js交互->事件/正则
    组件使用套路
      找组件，引组件，用组件(标签和js复制)，读，删，改，加 */

// 目标1：实现顶部导航->自定义样式
// 目标2：实现表单组件->读，改，加
// 目标3：收集值以后，调用接口->查看登
import { Notify } from 'vant'
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      user: {
        mobile: '19966528824', // 手机号
        code: '246810' // 验证码(密码 - 必须是246810 后台规定死的，无论手机号是什么)
      },
      isLoading: false // 登录按钮-加载状态
    }
  },
  methods: {
    // 提交方法（form整体通过验证才会触发）
    async onSubmit (values) {
      // 可以直接用values(收集参数名和值)
      console.log('submit', values)
      console.log(this.user)

      // 状态设置为true
      this.isLoading = true

      try {
        const res = await loginAPI(this.user)
        console.log(res)
        Notify({ type: 'success', message: '登陆成功' })
        setToken(res.data.data.token)
        /*
        跳转一定要写在最后->尽量最后执行
        location.href ->当前浏览器地址和要跳转的地址一样(不包含#后面锚点信息)->不会刷新网页
        地址改变，就会导致网页刷新
        location.href = 'http://localhost:8080/#/layout/home'
         */
        // this.$router.push() 压栈(会产生历史记录，可以回退), this.$router.replace() 替换(不会产生历史记录)
        this.$router.replace({
          path: '/layout/home' // 因为路由规则里/layout里没有重定向，所以直接在这里写全
        })
      } catch (err) {
        // Promise内ajax抛出错误，直接进入这里
        Notify({ type: 'danger', message: '账号或密码错误' })
      }

      this.isLoading = false // 网络请求完成无论成功/报错，把状态关掉
    }
  }
}
</script>

<style scoped lang="less">
/* 此类名是van-nav-bar 组件内根标签 */
// .van-nav-bar{
//   background-color: #007bff;
// }
// lang="less" 表示当前style标签内是less语法
// 用/deep/就不会被vscode标记红线
// /deep/会把属性选择器加到前面（用后代选择器的方式往里找匹配的类名）
// 结论：要修改组件内样式，如果你用了scoped，就需要在选择器前/deep/即可
// /deep/ .van-nav-bar__title{
//   color:white;
// }
</style>
